#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod solhealth {
    use super::*;

  pub fn close(_ctx: Context<CloseSolhealth>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solhealth.count = ctx.accounts.solhealth.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solhealth.count = ctx.accounts.solhealth.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolhealth>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solhealth.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolhealth<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solhealth::INIT_SPACE,
  payer = payer
  )]
  pub solhealth: Account<'info, Solhealth>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolhealth<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solhealth: Account<'info, Solhealth>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solhealth: Account<'info, Solhealth>,
}

#[account]
#[derive(InitSpace)]
pub struct Solhealth {
  count: u8,
}
