import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export const MINIMUM_SOL_BALANCE = 0.01 // Minimum SOL required for transactions

export async function createAgent(
  wallet: { publicKey: PublicKey | null },
  name: string,
  capabilities: string[]
) {
  if (!wallet.publicKey) {
    throw new Error('Wallet not connected')
  }

  try {
    // Check account balance
    const balance = await connection.getBalance(wallet.publicKey)
    const solBalance = balance / 1e9 // Convert lamports to SOL

    if (solBalance < MINIMUM_SOL_BALANCE) {
      throw new Error(`Insufficient balance. Please ensure you have at least ${MINIMUM_SOL_BALANCE} SOL`)
    }

    // Create a new account for the agent
    const agentAccount = Keypair.generate()
    
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: agentAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(0),
        space: 0,
        programId: SystemProgram.programId,
      })
    )

    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = wallet.publicKey

    // Request signature from wallet
    const signed = await window.solana.signTransaction(transaction)
    
    // Send the transaction
    const signature = await connection.sendRawTransaction(signed.serialize())
    await connection.confirmTransaction(signature)

    return {
      publicKey: agentAccount.publicKey.toBase58(),
      name,
      capabilities,
    }
  } catch (error) {
    console.error('Error creating agent:', error)
    throw error
  }
}

export async function fetchAgentSystem(id: string) {
  // This is a placeholder function. In a real application, you would fetch data from your Solana program.
  // For now, we'll return some dummy data based on the id.
  const systems = await fetchAgentSystems()
  return systems.find(system => system.id === id) || null
}

export async function updateAgentSystem(agentSystem: any) {
  // This is a placeholder function. In a real application, you would update data in your Solana program.
  console.log('Updating agent system:', agentSystem)
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return true
}

export async function fetchAgentSystems() {
  // This is a placeholder function. Replace with your actual data fetching logic.
  return [
    {
      id: '1',
      name: 'Research Assistant',
      agents: [
        { id: '1', name: 'Web Searcher', role: 'Worker', capabilities: ['web-search', 'summarize'] },
        { id: '2', name: 'Data Analyzer', role: 'Worker', capabilities: ['data-analysis', 'visualization'] },
      ],
      relationships: 'decentralized',
    },
    {
      id: '2',
      name: 'Social Media Manager',
      agents: [
        { id: '3', name: 'Content Creator', role: 'Worker', capabilities: ['generate-text', 'post-tweet'] },
        { id: '4', name: 'Engagement Tracker', role: 'Worker', capabilities: ['analyze-engagement', 'generate-report'] },
      ],
      relationships: 'centralized',
    },
  ]
}

