// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolhealthIDL from '../target/idl/solhealth.json'
import type { Solhealth } from '../target/types/solhealth'

// Re-export the generated IDL and type
export { Solhealth, SolhealthIDL }

// The programId is imported from the program IDL.
export const SOLHEALTH_PROGRAM_ID = new PublicKey(SolhealthIDL.address)

// This is a helper function to get the Solhealth Anchor program.
export function getSolhealthProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SolhealthIDL, address: address ? address.toBase58() : SolhealthIDL.address } as Solhealth, provider)
}

// This is a helper function to get the program ID for the Solhealth program depending on the cluster.
export function getSolhealthProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solhealth program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return SOLHEALTH_PROGRAM_ID
  }
}
