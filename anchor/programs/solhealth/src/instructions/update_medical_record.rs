use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::*;

pub fn update_medical_record(
    ctx: Context<UpdateMedicalRecord>,
    record_type: RecordType,
    image_url: String
) -> Result<()> {
    let medical_record = &mut ctx.accounts.medical_record;
    let clock = Clock::get()?;

    // Update the record with new data hash
   // medical_record.data_hash = data_hash;
    medical_record.image_url = image_url;
    medical_record.timestamp = clock.unix_timestamp as u64;
    medical_record.record_type = record_type;

    msg!("Medical record updated successfully");
    Ok(())
}

#[derive(Accounts)]
#[instruction(new_data_hash: String)]
pub struct UpdateMedicalRecord<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = medical_record.patient == patient_identity.key()
            @ ErrorCode::RecordPatientMismatch,
    )]
    pub medical_record: Account<'info, MedicalRecord>,

    #[account(
        constraint = patient_identity.owner == authority.key()
            || is_authorized_provider(
                &access_control,
                authority.key(),
                medical_record.record_type as u8
            ) @ ErrorCode::Unauthorized
    )]
    pub patient_identity: Account<'info, PatientIdentity>,

    #[account(
        constraint = access_control.patient == patient_identity.key()
            @ ErrorCode::InvalidAccessControl
    )]
    pub access_control: Account<'info, AccessControl>,
}

// Moved outside to avoid lifetime issues
pub fn is_authorized_provider(access: &AccessControl, provider: Pubkey, record_type: u8) -> bool {
    let now = Clock::get().unwrap().unix_timestamp as u64;

    access.provider == provider
        && access.record_type as u8 == record_type
        && access.is_active
        && access.expires_at > now
}
