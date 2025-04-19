'use client'

import { getSolhealthProgram, getSolhealthProgramId } from '@project/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useAnchorProvider } from '@/components/solana/solana-provider';
import { useCluster } from '@/components/cluster/cluster-data-access';
import { useTransactionToast } from '@/components/ui/ui-layout';
import { BN } from 'bn.js';

// Assuming this value comes in as a string, e.g., "LabResults"
function toAnchorRecordType(recordType: string): any {
    const anchorEnumMap: Record<string, any> = {
        medicalHistory: { medicalHistory: {} },
        medication: { medication: {} },
        labResults: { labResults: {} },
        imaging: { imaging: {} },
        insurance: { insurance: {} },
    };

    const key = recordType.charAt(0).toLowerCase() + recordType.slice(1);
    const anchorType = anchorEnumMap[key];

    if (!anchorType) throw new Error(`Unsupported record type: ${recordType}`);
    return anchorType;
}

export function usePatientRecordProgram() {
    const { connection } = useConnection();
    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const programId = useMemo(() => getSolhealthProgramId(cluster.network as Cluster), [cluster])
    const program = getSolhealthProgram(provider);

    const accounts = useQuery({
        queryKey: ["patientIdentity", "all", { cluster }],
        queryFn: () => program.account.patientIdentity.all(),
    });

    const getProgramAccount = useQuery({
        queryKey: ["get-program-account", { cluster }],
        queryFn: () => connection.getParsedAccountInfo(programId),
    });

    const createPatientIdentity = useMutation<string, Error, CreatePatientIdentityArgs>({
        mutationKey: ["patientIdentity", "create", { cluster }],
        mutationFn: async ({ name, patientId, email, phone, dataHash, owner }) => {
            const [patientIdentityPDA] = await PublicKey.findProgramAddress(
                [
                    Buffer.from('patient_identity'),
                    owner.toBuffer()
                ],
                programId
            );

            return program.methods.createPatient(name, patientId, email, phone, dataHash).rpc();
        },
        onSuccess: (signature) => {
            transactionToast(signature);
        },
        onError: (error) => {
            toast.error(`Failed to create patient entry: ${error.message}`);
        },
    });

    return { accounts, program, programId, getProgramAccount, createPatientIdentity }
}

export function usePatientRecordProgramAccount({ account }: { account: PublicKey }) {
    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const { program, accounts } = usePatientRecordProgram();


    const accountQuery = useQuery({
        queryKey: ["patientIdentity", "fetch", { cluster, account }],
        queryFn: () => program.account.patientIdentity.fetch(account),
    });

    return { accountQuery };
}

export function useMedicalRecordProgram() {
    const { connection } = useConnection();
    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const programId = useMemo(() => getSolhealthProgramId(cluster.network as Cluster), [cluster])
    const program = getSolhealthProgram(provider);
    const { publicKey } = useWallet();

    const accounts = useQuery({
        queryKey: ["medicalRecord", "all", { cluster }],
        queryFn: () => program.account.medicalRecord.all(),
    });

    const getPatientIdentityPDA = async (walletPublicKey: any) => {
        const [patientIdentityPDA, _] = await PublicKey.findProgramAddress(
            [
                Buffer.from('patient_identity'), // Note: using underscore, matching your Rust code
                walletPublicKey.toBuffer()
            ],
            programId
        );

        return patientIdentityPDA;
    };

    const patientMedicalRecord = useQuery({
        queryKey: ["medicalRecord", "fetchByPatient", publicKey?.toBase58()],
        queryFn: async () => {
            const records = await program.account.medicalRecord.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: publicKey?.toBase58() as string
                    }
                }
            ]);

            return records.map((record) => ({
                recordId: record.account.recordId,
                recordType: record.account.recordType,
                imageUrl: record.account.imageUrl,
                timestamp: record.account.timestamp.toNumber(),
                isActive: record.account.isActive,
            }));
        },
        enabled: !!publicKey
    });

    const createMedicalRecord = useMutation<string, Error, CreateMedicalRecordArgs>({
        mutationKey: ["medicalRecord", "create", { cluster }],
        mutationFn: async ({ recordId, recordType, imageUrl, patientIdentityKey, }) => {
            const [medicalRecordPDA, bump] = await PublicKey.findProgramAddress(
                [
                    Buffer.from('medical-record'),
                    patientIdentityKey.toBuffer(),
                    Buffer.from(recordId),
                ],
                programId
            );

            const patientIdentityPDA = await getPatientIdentityPDA(publicKey);

            const anchorRecordType = toAnchorRecordType(recordType);

            return program.methods.insertMedicalRecord(recordId, anchorRecordType, imageUrl).accounts({
                patient: publicKey!,
                patientIdentity: patientIdentityPDA,
            }).rpc();
        },
        onSuccess: (signature) => {
            transactionToast(signature);
            accounts.refetch();
        },
        onError: (error) => {
            console.log(error);
            toast.error(`Failed to create medical entry: ${error.message}`);
        },
    });

    return { patientMedicalRecord, createMedicalRecord, accounts, getPatientIdentityPDA };
}

export function useAccessControlProgram() {
    const { cluster } = useCluster();
    const { connection } = useConnection();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const programId = useMemo(() => getSolhealthProgramId(cluster.network as Cluster), [cluster])
    const program = getSolhealthProgram(provider);
    const { getPatientIdentityPDA } = useMedicalRecordProgram();
    const { publicKey } = useWallet();

    const accounts = useQuery({
        queryKey: ["accessControl", "all", { cluster }],
        queryFn: () => program.account.accessControl.all(),
    });

    const useGrantAccess = useMutation<string, Error, GrantAccessArgs>({
        mutationKey: ["accessControl", "grant", { cluster }],
        mutationFn: async ({
            recordType,
            recordTypeDiscriminant,
            accessDuration,
            providerPublicKey
        }) => {
            const patientIdentityPDA = await getPatientIdentityPDA(publicKey);

            const [accessControlPDA] = await PublicKey.findProgramAddress(
                [
                    Buffer.from('access_control'),
                    patientIdentityPDA.toBuffer(),
                    providerPublicKey.toBuffer(),
                    Buffer.from([recordTypeDiscriminant])
                ],
                program.programId
            );

            const anchorRecordType = toAnchorRecordType(recordType);

            return program.methods.grantRecordAccess(anchorRecordType, recordTypeDiscriminant, new BN(accessDuration)).accounts({
                patient: publicKey!,
                accessControl: accessControlPDA,
                provider: providerPublicKey,
                patientIdentity: patientIdentityPDA,
            }).rpc();
        },
        onSuccess: (signature) => {
            transactionToast(signature);
            accounts.refetch();
        },
        onError: (error) => {
            console.log(error);
            toast.error(`Failed to create medical entry: ${error.message}`);
        },
    });

    const useRevokeAccess = useMutation<string, Error, RevokeAccessArgs>({
        mutationKey: ["accessControl", "revoke", { cluster }],
        mutationFn: async ({ providerPublicKey, recordTypeDiscriminant }) => {
            const patientIdentityPDA = await getPatientIdentityPDA(publicKey);

            const [accessControlPDA] = await PublicKey.findProgramAddress(
                [
                    Buffer.from('access_control'),
                    patientIdentityPDA.toBuffer(),
                    providerPublicKey.toBuffer(),
                    Buffer.from([recordTypeDiscriminant])
                ],
                program.programId
            );

            const accountInfo = await connection.getAccountInfo(accessControlPDA);
            if (!accountInfo) {
              throw new Error("Access control account doesn't exist. It may have never been granted or was already revoked.");
            }

            return program.methods.revokeRecordAccess().accounts({
                patient: publicKey!,
                patientIdentity: patientIdentityPDA,
                accessControl: accessControlPDA
            }).rpc();
        },
        onSuccess: (signature) => {
            transactionToast(signature);
            accounts.refetch();
        },
        onError: (error) => {
            console.log(error);
            toast.error(`Failed to revoke access record: ${error.message}`);
        },
    });
    return { accounts, useGrantAccess, useRevokeAccess };
}