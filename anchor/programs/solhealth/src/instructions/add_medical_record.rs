use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::*;

pub fn add_medical_record(
    ctx: Context<AddMedicalRecord>,
    record_id: String,
    record_type: RecordType,
    image_url: String,
) -> Result<()> {
    let clock = Clock::get()?;

    let medical_record = &mut ctx.accounts.medical_record;
    medical_record.patient = ctx.accounts.patient_identity.key();
    medical_record.record_type = record_type;
    medical_record.record_id = record_id;
    medical_record.timestamp = clock.unix_timestamp as u64;
    medical_record.image_url = image_url;
    medical_record.is_active = true;
    medical_record.bump = ctx.bumps.medical_record;

    msg!("Medical record added successfully");
    Ok(())
}

#[derive(Accounts)]
#[instruction(record_id: String)]
pub struct AddMedicalRecord<'info> {
    #[account(mut)]
    pub patient: Signer<'info>,

    #[account(
        constraint = patient_identity.owner == patient.key() @ ErrorCode::NotPatientIdentityOwner,
    )]
    pub patient_identity: Account<'info, PatientIdentity>,

    #[account(
        init,
        payer = patient,
        space = 8 + MedicalRecord::INIT_SPACE,
        seeds = [
            b"medical-record", 
            patient_identity.key().as_ref(),
            record_id.as_bytes()
        ],
        bump
    )]
    pub medical_record: Account<'info, MedicalRecord>,

    pub system_program: Program<'info, System>,
}
