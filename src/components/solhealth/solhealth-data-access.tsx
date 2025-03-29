'use client'

import { getSolhealthProgram, getSolhealthProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useSolhealthProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolhealthProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSolhealthProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['solhealth', 'all', { cluster }],
    queryFn: () => program.account.solhealth.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solhealth', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solhealth: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolhealthProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolhealthProgram()

  const accountQuery = useQuery({
    queryKey: ['solhealth', 'fetch', { cluster, account }],
    queryFn: () => program.account.solhealth.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solhealth', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solhealth: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solhealth', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solhealth: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solhealth', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solhealth: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solhealth', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solhealth: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
