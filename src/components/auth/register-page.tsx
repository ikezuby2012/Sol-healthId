"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useReducer, useState } from "react";
import { v1 as uuidv1 } from 'uuid';

import BackUpCodePage from "@/components/auth/backup-code";
import BiometricPage from "@/components/auth/biometric-page";
import { CreatePersonIdentity } from "@/components/auth/create-person-identity";
import CreateSecretKeyPage from "@/components/auth/create-secret-key";
import AuthHeader from "@/components/molecules/auth/header";
import { usePatientRecordProgram } from "../healthId/healthId-data-access";
import { WalletErrorPage } from "../molecules/Error/wallet-error-page";


const AllSteps = ["create-person-identity", "biometric", "create-secure-key", "Backup-code"] as const;

type Steps = (typeof AllSteps)[number];

enum ActionTypes {
    UPDATE = "UPDATE",
    UPDATE_ALL = "UPDATE_ALL",
}

const PageHeader: Record<Steps, string> = {
    "create-person-identity": "Create your healthcare identity",
    "biometric": "Biometric Registration",
    "create-secure-key": "Create Secure Key to continue",
    "Backup-code": "create a backup code to continue"
};

const initialState = {
    firstName: '',
    lastName: '',
    DD: "",
    MM: "",
    YYYY: "",
    email: '',
    phoneNumber: '',
    backUpCode: "",
};

function reducer(state: StateType, action: Action) {
    switch (action.type) {
        case "UPDATE":
            console.log("Reducer updating:", action.name, "with", action.payload);
            return { ...state, [action.name]: action.payload };
        case "UPDATE_ALL":
            return { ...state, ...action.payload };
        default:
            throw new Error("Unknown action type");
    }
}

export default function RegisterPage() {
    const { publicKey, connected } = useWallet();
    const { createPatientIdentity } = usePatientRecordProgram();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [level, setLevel] = useState(1);

    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const dummyStep = page as Steps;

    const getStepIndex = (step?: string): number => {
        const index = AllSteps.indexOf(step as Steps);
        return index >= 0 ? index : 0;
    };

    const secretKey = uuidv1();

    const handlePrevStep = () => {
        const prevLevel = level - 1;
        if (prevLevel >= 1) {
            setLevel(prevLevel);
            const prevStep = AllSteps[prevLevel - 1];
            router.push(`?page=${prevStep}`);
        }
    };


    const handleNextStep = () => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        const nextStep = AllSteps[nextLevel - 1];

        if (nextStep) {
            router.push(`?page=${nextStep}`);
        }
    };

    const handleLogin = async () => {
        console.log('initial values', state);

        const name = `${state.firstName} ${state.lastName}`;
        const patientId = secretKey;
        const email = state.email;
        const phone = state.phoneNumber;
        const dataHash = state.backUpCode;


        try {
            setLoading(true);

            await createPatientIdentity.mutateAsync({
                name, patientId, email, phone, dataHash, owner: publicKey
            });
        } catch (err) {
            console.error('failed to create patient identity', err);
            // toast.error(`Failed to create patient identity: ${err}`);
            return;
        } finally {
            setLoading(false);
        }

        router.push('/auth/login');
    };


    const updateState = (name: string, payload: string | number | boolean) => {
        console.log("Dispatching UPDATE:", { name, payload });
        dispatch({
            type: ActionTypes.UPDATE,
            name,
            payload,
        });
    };

    const updateAllState = (payload: CreatePersonIdentityFormCredentials) => {
        dispatch({
            type: ActionTypes.UPDATE_ALL,
            payload,
        });
    };

    const renderSelectedSteps = (steps: Steps): React.JSX.Element => {
        // typescript already enforces a JSX return
        switch (steps) {
            case "create-secure-key":
                // setLevel(2);
                return <CreateSecretKeyPage secretKey={secretKey} onNextClick={handleNextStep} />;
            case "biometric":
                // setLevel(3);
                return <BiometricPage onNextClick={handleNextStep} />;
            case "Backup-code":
                // setLevel(4);
                return <BackUpCodePage isLoading={loading} updatePayload={(name, payload) => updateState(name, payload)} onPrevClick={handlePrevStep} onNextClick={handleLogin} />;
            default:
                return <CreatePersonIdentity onNextClick={handleNextStep} updatePayload={updateAllState} />
        }
    }

    console.log(publicKey, "public key here");

    if (!connected) {
        return <WalletErrorPage />;
    }


    return (
        <>
            <AuthHeader text={PageHeader[dummyStep] ?? "Welcome, we need some more information about you"} step={getStepIndex(dummyStep) + 1} />
            {renderSelectedSteps(dummyStep)}
        </>
    );

}