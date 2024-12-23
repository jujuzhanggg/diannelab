"use client"

import { useState, useEffect } from 'react'
import { AgentCard } from './agent-card'
import { fetchAgentSystems } from '@/utils/solana'

interface AgentSystem {
  id: string
  name: string
  agents: Array<{
    id: string
    name: string
    role: string
    capabilities: string[]
  }>
  relationships: string
}

export function AgentList() {
  const [agentSystems, setAgentSystems] = useState<AgentSystem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAgentSystems() {
      try {
        const systems = await fetchAgentSystems()
        setAgentSystems(systems)
      } catch (error) {
        console.error('Error fetching agent systems:', error)
        setError('Failed to load agent systems. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadAgentSystems()
  }, [])

  if (loading) {
    return <div>Loading agent systems...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (agentSystems.length === 0) {
    return <div>No agent systems available. Create one to get started!</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {agentSystems.map((system) => (
        <AgentCard key={system.id} agentSystem={system} />
      ))}
    </div>
  )
}

