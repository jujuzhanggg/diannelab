"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitBranch, List } from 'lucide-react'

interface WorkflowSelectorProps {
  agentId: string
}

export function WorkflowSelector({ agentId }: WorkflowSelectorProps) {
  const router = useRouter()
  const [selectedWorkflow, setSelectedWorkflow] = useState<'chain' | 'tree' | null>(null)

  const handleWorkflowSelect = (workflow: 'chain' | 'tree') => {
    setSelectedWorkflow(workflow)
    router.push(`/workflow/${agentId}/${workflow}`)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      <Card 
        className={`cursor-pointer transition-all hover:border-purple-400 ${
          selectedWorkflow === 'chain' ? 'border-purple-500' : ''
        }`}
        onClick={() => handleWorkflowSelect('chain')}
      >
        <CardHeader>
          <List className="w-8 h-8 text-purple-500 mb-2" />
          <CardTitle>Chain of Thoughts</CardTitle>
          <CardDescription>
            Linear progression of thoughts, each building upon the previous one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Sequential thinking process</li>
            <li>Step-by-step reasoning</li>
            <li>Clear progression of ideas</li>
            <li>Ideal for linear problem-solving</li>
          </ul>
          <Button 
            className="w-full mt-4"
            variant={selectedWorkflow === 'chain' ? 'default' : 'outline'}
          >
            Select Chain of Thoughts
          </Button>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all hover:border-purple-400 ${
          selectedWorkflow === 'tree' ? 'border-purple-500' : ''
        }`}
        onClick={() => handleWorkflowSelect('tree')}
      >
        <CardHeader>
          <GitBranch className="w-8 h-8 text-purple-500 mb-2" />
          <CardTitle>Tree of Thoughts</CardTitle>
          <CardDescription>
            Branching exploration of multiple thought paths simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Parallel thinking paths</li>
            <li>Explore multiple possibilities</li>
            <li>Branch and evaluate options</li>
            <li>Best for complex decision-making</li>
          </ul>
          <Button 
            className="w-full mt-4"
            variant={selectedWorkflow === 'tree' ? 'default' : 'outline'}
          >
            Select Tree of Thoughts
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

