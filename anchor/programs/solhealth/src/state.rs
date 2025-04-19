use anchor_lang::prelude::*;

pub const NAME_LENGTH: usize = 32;

#[derive(AnchorDeserialize, AnchorSerialize, Copy, Clone, Debug, InitSpace)]
pub enum RecordType {
    MedicalHistory,
    Medication,
    LabResults,
    Imaging,
    Insurance,
}

#[account]
#[derive(InitSpace, Debug)]
pub struct PatientIdentity {
    pub owner: Pubkey,
    pub mint: Pubkey,
    #[max_len(10)]
    pub name: String,
    #[max_len(20)]
    pub patient_id: String,
    #[max_len(50)]
    pub email: String,
    #[max_len(15)]
    pub phone_number: String,
    #[max_len(50)]
    pub data_hash: String,
    pub is_active: bool,
    pub is_soft_deleted: bool,
    pub created_at: u64,
    pub updated_at: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace, Debug)]
pub struct AccessControl {
    pub patient: Pubkey,
    pub provider: Pubkey,
    pub record_type: RecordType,
    pub granted_at: u64,
    pub expires_at: u64,
    pub is_active: bool,
    pub bump: u8,
}

#[account]
#[derive(InitSpace, Debug)]
pub struct MedicalRecord {
    pub patient: Pubkey,
    pub record_type: RecordType,
    #[max_len(50)]
    pub record_id: String,
    #[max_len(150)]
    pub image_url: String,
    pub timestamp: u64,
    pub is_active: bool,
    pub bump: u8,
}