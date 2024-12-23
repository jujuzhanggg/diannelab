"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'

interface ChainOfThoughtsProps {
  agentId: string
}

interface Thought {
  id: string
  content: string
}

export function ChainOfThoughts({ agentId }: ChainOfThoughtsProps) {
  const [thoughts, setThoughts] = useState<Thought[]>([{ id: '1', content: '' }])

  const addThought = () => {
    setThoughts([...thoughts, { id: Date.now().toString(), content: '' }])
  }

  const updateThought = (id: string, content: string) => {
    setThoughts(thoughts.map(thought => 
      thought.id === id ? { ...thought, content } : thought
    ))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {thoughts.map((thought, index) => (
        <Card key={thought.id}>
          <CardHeader>
            <CardTitle>Thought {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={thought.content}
              onChange={(e) => updateThought(thought.id, e.target.value)}
              placeholder="Enter your thought..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addThought} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Next Thought
      </Button>
    </div>
  )
}

