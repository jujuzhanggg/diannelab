"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchAgentSystem, updateAgentSystem } from '@/utils/solana'
import { AgentEditor } from './agent-editor'
import { toast } from '@/components/ui/use-toast'

interface AgentCustomizerProps {
  agentId: string
}

export function AgentCustomizer({ agentId }: AgentCustomizerProps) {
  const [agentSystem, setAgentSystem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgentSystem() {
      try {
        const system = await fetchAgentSystem(agentId)
        setAgentSystem(system)
      } catch (error) {
        console.error('Error fetching agent system:', error)
        toast({
          title: "Error",
          description: "Failed to load agent system",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadAgentSystem()
  }, [agentId])

  const handleSave = async () => {
    try {
      await updateAgentSystem(agentSystem)
      toast({
        title: "Success",
        description: "Agent system updated successfully",
      })
    } catch (error) {
      console.error('Error updating agent system:', error)
      toast({
        title: "Error",
        description: "Failed to update agent system",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading agent system...</div>
  }

  if (!agentSystem) {
    return <div>Agent system not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="system-name">System Name</Label>
        <Input
          id="system-name"
          value={agentSystem.name}
          onChange={(e) => setAgentSystem({ ...agentSystem, name: e.target.value })}
        />
      </div>
      
      <div>
        <Label>Agents</Label>
        {agentSystem.agents.map((agent, index) => (
          <AgentEditor
            key={agent.id}
            agent={agent}
            onUpdate={(updatedAgent) => {
              const updatedAgents = [...agentSystem.agents]
              updatedAgents[index] = updatedAgent
              setAgentSystem({ ...agentSystem, agents: updatedAgents })
            }}
          />
        ))}
      </div>
      
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}

