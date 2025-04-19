use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Cannot initialize, name too long")]
    NameTooLong,
    #[msg("Access has already been revoked")]
    AccessAlreadyRevoked,
    #[msg("Access has expired")]
    AccessExpired,
    #[msg("Unauthorized access attempt")]
    Unauthorized,
    #[msg("The signer is not the owner of this patient identity.")]
    NotPatientIdentityOwner,
    #[msg("Provider must be a signer")]
    ProviderNotSigner,
    #[msg("Invalid Record Type")]
    InvalidRecordType,
    #[msg("Medical record doesn't belong to this patient")]
    RecordPatientMismatch,
    #[msg("New data hash exceeds maximum length")]
    DataHashTooLong,
    #[msg("Access control doesn't match patient identity")]
    InvalidAccessControl,
}
