import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Solhealth } from '../target/types/solhealth'

describe('solhealth', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solhealth as Program<Solhealth>

  const solhealthKeypair = Keypair.generate()

  it('Initialize Solhealth', async () => {
    await program.methods
      .initialize()
      .accounts({
        solhealth: solhealthKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solhealthKeypair])
      .rpc()

    const currentCount = await program.account.solhealth.fetch(solhealthKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solhealth', async () => {
    await program.methods.increment().accounts({ solhealth: solhealthKeypair.publicKey }).rpc()

    const currentCount = await program.account.solhealth.fetch(solhealthKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solhealth Again', async () => {
    await program.methods.increment().accounts({ solhealth: solhealthKeypair.publicKey }).rpc()

    const currentCount = await program.account.solhealth.fetch(solhealthKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solhealth', async () => {
    await program.methods.decrement().accounts({ solhealth: solhealthKeypair.publicKey }).rpc()

    const currentCount = await program.account.solhealth.fetch(solhealthKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solhealth value', async () => {
    await program.methods.set(42).accounts({ solhealth: solhealthKeypair.publicKey }).rpc()

    const currentCount = await program.account.solhealth.fetch(solhealthKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solhealth account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solhealth: solhealthKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solhealth.fetchNullable(solhealthKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
