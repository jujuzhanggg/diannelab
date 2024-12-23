"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { createAgent } from '@/utils/solana'
import { useWallet } from '@/contexts/wallet-context'
import { toast } from '@/components/ui/use-toast'

interface CreateAgentModalProps {
  isOpen: boolean
  onClose: () => void
}

const CAPABILITIES = [
  { id: 'web-search', label: 'Web Search' },
  { id: 'summarize', label: 'Summarize' },
  { id: 'post-tweet', label: 'Post Tweet' },
  { id: 'like-tweet', label: 'Like Tweet' },
]

export function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const { connected, publicKey, balance, connect } = useWallet()
  const [agentName, setAgentName] = useState('')
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateAgent = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (balance <= 0.01) {
      toast({
        title: "Insufficient balance",
        description: "Please ensure you have at least 0.01 SOL in your wallet",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    try {
      const agent = await createAgent({ publicKey }, agentName, selectedCapabilities)
      toast({
        title: "Success",
        description: "Agent created successfully",
      })
      onClose()
    } catch (error) {
      console.error('Error creating agent:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create agent",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!connected ? (
            <Button onClick={connect} className="w-full">
              Connect Wallet
            </Button>
          ) : (
            <>
              <div>
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input
                  id="agent-name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter agent name"
                />
              </div>
              <div>
                <Label>Capabilities</Label>
                <div className="space-y-2">
                  {CAPABILITIES.map((capability) => (
                    <div key={capability.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={capability.id}
                        checked={selectedCapabilities.includes(capability.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCapabilities(
                            checked
                              ? [...selectedCapabilities, capability.id]
                              : selectedCapabilities.filter((id) => id !== capability.id)
                          )
                        }}
                      />
                      <Label htmlFor={capability.id}>{capability.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleCreateAgent} 
                disabled={isCreating || !agentName || selectedCapabilities.length === 0}
                className="w-full"
              >
                {isCreating ? 'Creating...' : 'Create Agent'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

