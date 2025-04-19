#![allow(clippy::result_large_err)]
use crate::instructions::*;
use crate::state::*;
use anchor_lang::prelude::*;

mod error;
mod instructions;
mod state;

declare_id!("EPvFfFfRmbt1ZPtgstNFePa8BGNDfBPUBmY6t9mGYT7Z");

#[program]
pub mod solhealth {
    use super::*;

    pub fn create_patient(
        ctx: Context<CreateIdentity>,
        name: String,
        patient_id: String,
        email: String,
        phone: String,
        data_hash: String,
    ) -> Result<()> {
        create_patient_identity(ctx, name, patient_id, email, phone, data_hash)
    }

    pub fn insert_medical_record(
        ctx: Context<AddMedicalRecord>,
        record_id: String,
        record_type: RecordType,
        image_url: String
    ) -> Result<()> {
        add_medical_record(ctx, record_id, record_type, image_url)
    }

    pub fn grant_record_access(
        ctx: Context<GrantAccess>,
        record_type: RecordType,
        record_type_discriminant: u8,
        access_duration: u64,
    ) -> Result<()> {
        grant_access(ctx, record_type, record_type_discriminant, access_duration)
    }

    pub fn revoke_record_access(ctx: Context<RevokeAccess>) -> Result<()> {
        revoke_access(ctx)
    }

    pub fn update_med_record(
        ctx: Context<UpdateMedicalRecord>,
        record_type: RecordType,
        image_url: String
    ) -> Result<()> {
        update_medical_record(ctx,  record_type, image_url)
    }

    pub fn update_patient_data(
        ctx: Context<UpdatePatientIdentity>,
        new_name: String,
        new_data_hash: String,
        is_active: bool,
    ) -> Result<()> {
        update_patient_identity(ctx, new_name, new_data_hash, is_active)
    }
}
