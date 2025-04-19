use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::*;

pub fn revoke_access(ctx: Context<RevokeAccess>) -> Result<()> {
    let access_control = &mut ctx.accounts.access_control;
    let clock = Clock::get()?;

    require!(access_control.is_active, ErrorCode::AccessAlreadyRevoked);

    access_control.is_active = false;
    access_control.expires_at = clock.unix_timestamp as u64;

    msg!("Access revoked successfully");
    Ok(())
}

#[derive(Accounts)]
pub struct RevokeAccess<'info> {
    #[account(mut)]
    pub patient: Signer<'info>,

    #[account(
        constraint = patient_identity.owner == patient.key() @ ErrorCode::NotPatientIdentityOwner,
    )]
    pub patient_identity: Account<'info, PatientIdentity>,

    #[account(
        mut,
        constraint = access_control.patient == patient.key() @ ErrorCode::NotPatientIdentityOwner,
        close = patient
    )]
    pub access_control: Account<'info, AccessControl>,
}
