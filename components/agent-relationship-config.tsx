import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface AgentRelationshipConfigProps {
  relationship: string
  setRelationship: (relationship: string) => void
}

export function AgentRelationshipConfig({ relationship, setRelationship }: AgentRelationshipConfigProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Agent Relationship</h3>
      <RadioGroup value={relationship} onValueChange={setRelationship}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="centralized" id="centralized" />
          <Label htmlFor="centralized">Centralized (One manager, many workers)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="decentralized" id="decentralized" />
          <Label htmlFor="decentralized">Decentralized (Peer-to-peer)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hierarchical" id="hierarchical" />
          <Label htmlFor="hierarchical">Hierarchical (Multiple levels of management)</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

