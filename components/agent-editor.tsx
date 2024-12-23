import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface AgentEditorProps {
  agent: any
  onUpdate: (updatedAgent: any) => void
}

export function AgentEditor({ agent, onUpdate }: AgentEditorProps) {
  const handleCapabilityToggle = (capability: string) => {
    const updatedCapabilities = agent.capabilities.includes(capability)
      ? agent.capabilities.filter((c: string) => c !== capability)
      : [...agent.capabilities, capability]
    onUpdate({ ...agent, capabilities: updatedCapabilities })
  }

  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="mb-2">
        <Label htmlFor={`agent-name-${agent.id}`}>Name</Label>
        <Input
          id={`agent-name-${agent.id}`}
          value={agent.name}
          onChange={(e) => onUpdate({ ...agent, name: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <Label htmlFor={`agent-role-${agent.id}`}>Role</Label>
        <Input
          id={`agent-role-${agent.id}`}
          value={agent.role}
          onChange={(e) => onUpdate({ ...agent, role: e.target.value })}
        />
      </div>
      <div>
        <Label>Capabilities</Label>
        <div className="space-y-2">
          {['web-search', 'summarize', 'generate-text', 'analyze-data'].map((capability) => (
            <div key={capability} className="flex items-center">
              <Checkbox
                id={`${agent.id}-${capability}`}
                checked={agent.capabilities.includes(capability)}
                onCheckedChange={() => handleCapabilityToggle(capability)}
              />
              <Label htmlFor={`${agent.id}-${capability}`} className="ml-2">
                {capability}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

