"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'

interface WalletContextType {
  connected: boolean
  publicKey: PublicKey | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  balance: 0,
  connect: async () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)
  const [balance, setBalance] = useState(0)

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

  const connect = async () => {
    try {
      if (typeof window === 'undefined' || !window.solana) {
        alert('Please install Phantom wallet')
        return
      }

      const response = await window.solana.connect()
      const key = new PublicKey(response.publicKey.toString())
      setPublicKey(key)
      setConnected(true)

      // Get account balance
      const balance = await connection.getBalance(key)
      setBalance(balance / 1e9) // Convert lamports to SOL
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnect = () => {
    if (window.solana) {
      window.solana.disconnect()
      setConnected(false)
      setPublicKey(null)
      setBalance(0)
    }
  }

  useEffect(() => {
    if (window.solana?.isConnected) {
      connect()
    }
  }, [])

  return (
    <WalletContext.Provider value={{ connected, publicKey, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

