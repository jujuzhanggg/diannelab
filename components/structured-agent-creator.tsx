"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

type AgentStructure = 'single' | 'multi'
type AgentHierarchy = 'flat' | 'managed'

interface AgentConfig {
  id: string
  name: string
  role: string
  tools: string[]
}

const API_TOOLS = [
  { id: 'openai', name: 'OpenAI API' },
  { id: 'twitter', name: 'Twitter API' },
  { id: 'instagram', name: 'Instagram API' },
  { id: 'phantom', name: 'Phantom Wallet API' },
  { id: 'solana', name: 'Solana JSON-RPC API' },
  { id: 'google-search', name: 'Google Search API' },
  { id: 'wolfram-alpha', name: 'Wolfram Alpha API' },
  { id: 'weather', name: 'Weather API' },
  { id: 'news', name: 'News API' },
  { id: 'spotify', name: 'Spotify API' },
]

export function StructuredAgentCreator() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [agentStructure, setAgentStructure] = useState<AgentStructure>('single')
  const [agentHierarchy, setAgentHierarchy] = useState<AgentHierarchy>('flat')
  const [numAgents, setNumAgents] = useState(2)
  const [managerConfig, setManagerConfig] = useState<AgentConfig>({
    id: 'manager',
    name: '',
    role: 'Manager',
    tools: [],
  })
  const [workerConfigs, setWorkerConfigs] = useState<AgentConfig[]>([])
  const [systemName, setSystemName] = useState('')

  const handleNextStep = () => {
    if (step === 1 && agentStructure === 'single') {
      const agentId = Math.random().toString(36).substr(2, 9)
      router.push(`/workflow-selection/${agentId}`)
      return
    }

    if (step === 2) {
      const workers = Array(agentHierarchy === 'managed' ? numAgents - 1 : numAgents)
        .fill(null)
        .map((_, index) => ({
          id: `worker-${index}`,
          name: '',
          role: 'Worker',
          tools: [],
        }))
      setWorkerConfigs(workers)
    }

    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleCreateSystem = () => {
    // In a real application, this would create the agent system in your backend
    const systemId = Math.random().toString(36).substr(2, 9)
    const system = {
      id: systemId,
      name: systemName,
      hierarchy: agentHierarchy,
      manager: agentHierarchy === 'managed' ? managerConfig : null,
      workers: workerConfigs,
    }
    console.log('Created system:', system)
    router.push(`/multi-agent/${systemId}`)
  }

  const updateWorkerConfig = (index: number, field: keyof AgentConfig, value: string | string[]) => {
    const updatedConfigs = [...workerConfigs]
    updatedConfigs[index] = { ...updatedConfigs[index], [field]: value }
    setWorkerConfigs(updatedConfigs)
  }

  const toggleTool = (agentConfig: AgentConfig, setConfig: (config: AgentConfig) => void, toolId: string) => {
    const newTools = agentConfig.tools.includes(toolId)
      ? agentConfig.tools.filter(id => id !== toolId)
      : [...agentConfig.tools, toolId]
    setConfig({ ...agentConfig, tools: newTools })
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Choose Agent Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={agentStructure} onValueChange={(value: AgentStructure) => setAgentStructure(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single">Single Agent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multi" id="multi" />
            <Label htmlFor="multi">Multi-Agent System</Label>
          </div>
        </RadioGroup>
        <Button onClick={handleNextStep} className="mt-4">
          {agentStructure === 'single' ? 'Create Agent' : 'Next'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Step 2: Configure Multi-Agent System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="system-name">System Name</Label>
            <Input
              id="system-name"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              placeholder="Enter system name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="block mb-2">Hierarchy Type</Label>
            <RadioGroup value={agentHierarchy} onValueChange={(value: AgentHierarchy) => setAgentHierarchy(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flat" id="flat" />
                <Label htmlFor="flat">Flat Structure (No manager)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="managed" id="managed" />
                <Label htmlFor="managed">Managed Structure (One agent manages others)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="num-agents">Number of {agentHierarchy === 'managed' ? 'Worker' : ''} Agents</Label>
            <Input
              id="num-agents"
              type="number"
              min={2}
              max={10}
              value={numAgents}
              onChange={(e) => setNumAgents(Math.min(10, Math.max(2, parseInt(e.target.value))))}
              className="mt-1"
            />
          </div>

          <div className="flex justify-between">
            <Button onClick={handlePreviousStep} variant="outline">Previous</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Step 3: Configure Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {agentHierarchy === 'managed' && (
            <div className="mb-8 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Manager Agent</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="manager-name">Name</Label>
                  <Input
                    id="manager-name"
                    value={managerConfig.name}
                    onChange={(e) => setManagerConfig({ ...managerConfig, name: e.target.value })}
                    placeholder="Enter manager name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Available Tools</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {API_TOOLS.map((tool) => (
                      <div key={tool.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`manager-${tool.id}`}
                          checked={managerConfig.tools.includes(tool.id)}
                          onCheckedChange={() => toggleTool(
                            managerConfig,
                            setManagerConfig,
                            tool.id
                          )}
                        />
                        <Label htmlFor={`manager-${tool.id}`}>{tool.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {workerConfigs.map((worker, index) => (
              <div key={worker.id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Worker Agent {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`worker-${index}-name`}>Name</Label>
                    <Input
                      id={`worker-${index}-name`}
                      value={worker.name}
                      onChange={(e) => updateWorkerConfig(index, 'name', e.target.value)}
                      placeholder={`Enter worker ${index + 1} name`}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Available Tools</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {API_TOOLS.map((tool) => (
                        <div key={tool.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`worker-${index}-${tool.id}`}
                            checked={worker.tools.includes(tool.id)}
                            onCheckedChange={() => {
                              const newTools = worker.tools.includes(tool.id)
                                ? worker.tools.filter(id => id !== tool.id)
                                : [...worker.tools, tool.id]
                              updateWorkerConfig(index, 'tools', newTools)
                            }}
                          />
                          <Label htmlFor={`worker-${index}-${tool.id}`}>{tool.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-between mt-6">
          <Button onClick={handlePreviousStep} variant="outline">Previous</Button>
          <Button onClick={handleCreateSystem}>Create System</Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {renderCurrentStep()}
    </div>
  )
}

