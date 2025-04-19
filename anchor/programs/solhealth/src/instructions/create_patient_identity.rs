use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::*;

pub fn create_patient_identity(
    ctx: Context<CreateIdentity>,
    name: String,
    patient_id: String,
    email: String,
    phone: String,
    data_hash: String,
) -> Result<()> {
    let identity = &mut ctx.accounts.patient_identity;

    require!(name.as_bytes().len() <= NAME_LENGTH, ErrorCode::NameTooLong);
    let patient = &ctx.accounts.patient;
    let clock = Clock::get()?;

    identity.owner = patient.key();
    identity.name = name;
    identity.patient_id = patient_id;
    identity.data_hash = data_hash;
    identity.email = email;
    identity.phone_number = phone;
    identity.is_active = true;
    identity.is_soft_deleted = false;
    identity.created_at = clock.unix_timestamp as u64;
    identity.updated_at = clock.unix_timestamp as u64;

    msg!("Patient identity created successfully");
    Ok(())
}

// Context for creating a patient identity
#[derive(Accounts)]
pub struct CreateIdentity<'info> {
    #[account(mut)]
    pub patient: Signer<'info>,

    #[account(
        init,
        payer = patient,
        space = 8 + PatientIdentity::INIT_SPACE,
        seeds = [b"patient_identity", patient.key().as_ref()],
        bump
    )]
    pub patient_identity: Account<'info, PatientIdentity>,
    pub system_program: Program<'info, System>,
}
