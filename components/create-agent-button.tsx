"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreateAgentModal } from './create-agent-modal'

export function CreateAgentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Create Agent</Button>
      <CreateAgentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

