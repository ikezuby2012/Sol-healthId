use crate::error::ErrorCode;
use crate::state::*;
use anchor_lang::prelude::*;

pub fn update_patient_identity(
    ctx: Context<UpdatePatientIdentity>,
    new_name: String,
    new_data_hash: String,
    is_active: bool,
) -> Result<()> {
    require!(new_name.len() <= 10, ErrorCode::NameTooLong);
    require!(new_data_hash.len() <= 50, ErrorCode::DataHashTooLong);

    let patient_identity = &mut ctx.accounts.patient_identity;
    let clock = Clock::get()?; // Get current time

    patient_identity.name = new_name;
    patient_identity.data_hash = new_data_hash;
    patient_identity.is_active = is_active;
    patient_identity.updated_at = clock.unix_timestamp as u64;

    msg!("Patient identity updated successfully");
    Ok(())
}

#[derive(Accounts)]
pub struct UpdatePatientIdentity<'info> {
    #[account(mut)]
    pub authority: Signer<'info>, // The person requesting the update

    #[account(
        mut,
        constraint = patient_identity.owner == authority.key() @ ErrorCode::Unauthorized
    )]
    pub patient_identity: Account<'info, PatientIdentity>,
}
