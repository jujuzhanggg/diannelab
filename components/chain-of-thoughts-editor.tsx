import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface ChainOfThoughtsEditorProps {
  chainOfThoughts: string[]
  setChainOfThoughts: (thoughts: string[]) => void
}

export function ChainOfThoughtsEditor({ chainOfThoughts, setChainOfThoughts }: ChainOfThoughtsEditorProps) {
  const [newThought, setNewThought] = useState('')

  const addThought = () => {
    if (newThought.trim()) {
      setChainOfThoughts([...chainOfThoughts, newThought.trim()])
      setNewThought('')
    }
  }

  const removeThought = (index: number) => {
    setChainOfThoughts(chainOfThoughts.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chain of Thoughts</h3>
      {chainOfThoughts.map((thought, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input value={thought} readOnly />
          <Button variant="destructive" onClick={() => removeThought(index)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Input
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Enter a new thought"
        />
        <Button onClick={addThought}>Add Thought</Button>
      </div>
    </div>
  )
}

