use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::*;

pub fn grant_access(
    ctx: Context<GrantAccess>,
    record_type: RecordType,
    record_type_discriminant: u8,
    access_duration: u64,
) -> Result<()> {
    let access_control = &mut ctx.accounts.access_control;
    let patient_identity = &ctx.accounts.patient_identity;

    require_eq!(
        record_type as u8,
        record_type_discriminant,
        ErrorCode::InvalidRecordType
    );

    let clock = Clock::get()?;
    let now = clock.unix_timestamp as u64;

    access_control.patient = patient_identity.key();
    access_control.provider = ctx.accounts.provider.key();
    access_control.record_type = record_type;
    access_control.granted_at = now;
    access_control.expires_at = now + access_duration;
    access_control.is_active = true;

    msg!("Access granted successfully");
    Ok(())
}

#[derive(Accounts)]
#[instruction(record_type_discriminant: u8)]
pub struct GrantAccess<'info> {
    #[account(mut)]
    pub patient: Signer<'info>,

    #[account(
        constraint = patient_identity.owner == patient.key() @ ErrorCode::NotPatientIdentityOwner,
    )]
    pub patient_identity: Account<'info, PatientIdentity>,

    /// CHECK: This account represents the provider and must be a signer.
    #[account(
        mut,
        constraint = provider.is_signer @ ErrorCode::ProviderNotSigner
    )]
    pub provider: AccountInfo<'info>,

    #[account(
        init,
        payer=patient,
        space = 8 + AccessControl::INIT_SPACE,
        seeds = [
            b"access_control",
            patient_identity.key().as_ref(),
            provider.key().as_ref(),
            &[record_type_discriminant]
        ],
        bump
    )]
    pub access_control: Account<'info, AccessControl>,

    pub system_program: Program<'info, System>,
}
