import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export interface IMedicalRecord {
    recordId: string;
    patient: PublicKey; // from @solana/web3.js
    recordType: { imaging?: any; lab?: any; diagnosis?: any };
    isActive: boolean;
    imageUrl: string;
    timestamp: BN; // from bn.js
}

interface RecordType {
    medication: Record<string, any>;
}

export interface IAccessControlData {
    bump: number;
    expiresAt: BN;
    grantedAt: BN;
    isActive: boolean;
    patient: PublicKey;
    provider: PublicKey;
    recordType: RecordType;
}