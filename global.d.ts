type RecordType = "MedicalHistory" | "Medication" | "LabResults" | "Imaging" | "Insurance";


interface IPatientIdentity {
    owner: string; // base58-encoded public key
    mint: string;  // base58-encoded public key
    name: string; // max 10 chars
    patient_id: string; // max 20 chars
    email: string; // max 50 chars
    phone_number: string; // max 15 chars
    data_hash: string; // max 50 chars
    is_active: boolean;
    is_soft_deleted: boolean;
    created_at: bigint; // or number if you're fine with JS limits
    updated_at: bigint;
    bump: number;
}

interface IAccessControl {
    patient: string; // base58-encoded public key
    provider: string; // base58-encoded public key
    record_type: "MedicalHistory" | "Medication" | "LabResults" | "Imaging" | "Insurance";
    granted_at: bigint; // or number if you're okay with smaller range
    expires_at: bigint;
    is_active: boolean;
    bump: number;
}

interface IProviderRelationship {
    patient: string;
    provider: string;
    access_control: string;
    record_type: RecordType;
    granted_at: bigint; // or number if you're okay with smaller range
    expires_at: bigint;
    is_active: boolean;
}

interface CreatePersonIdentityFormCredentials {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    DD: string;
    MM: string;
    YYYY: string;
}

type Action =
    | { type: "UPDATE"; name: string; payload: string | number | boolean }
    | { type: "UPDATE_ALL"; payload: Partial<StateType> };

type StateType = {
    firstName: string;
    lastName: string;
    DD: string;
    MM: string;
    YYYY: string;
    backUpCode: string;
    email: string;
    phoneNumber: string;
};

interface CreatePersonIdentityMutautionProps {
    name: string;
    patientId: string;
    email: string;
    phone: string;
    dataHash: string;
}

interface CreatePatientIdentityArgs {
    name: string;
    patientId: string;
    email: string;
    phone: string;
    dataHash: string;
    owner: PublicKey; // Explicitly include the owner's public key
}

interface CreateMedicalRecordArgs {
    recordId: string;
    recordType: string; // Assuming RecordType is a string (e.g., "LAB", "XRAY")
    imageUrl: string;
    patientIdentityKey: PublicKey;
}

enum RecordType {
    MedicalHistory,
    Medication,
    LabResults,
    Imaging,
    Insurance,
}

interface GrantAccessArgs {
    recordType: string;               // The record type in a user-friendly format
    recordTypeDiscriminant: number;   // The numeric value corresponding to the record type enum
    accessDuration: number;           // Duration in seconds
    providerPublicKey: PublicKey;     // Public key of the provider to grant access to
}

interface RevokeAccessArgs {
    providerPublicKey: PublicKey;
    recordTypeDiscriminant: number;
}