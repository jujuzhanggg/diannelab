import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Agent {
  id: string
  name: string
  role: string
  capabilities: string[]
}

interface AgentSystem {
  id: string
  name: string
  agents: Agent[]
  relationships: string
}

interface AgentCardProps {
  agentSystem: AgentSystem
}

export function AgentCard({ agentSystem }: AgentCardProps) {
  if (!agentSystem || typeof agentSystem !== 'object') {
    return (
      <Card>
        <CardContent>
          <p>Invalid agent system data</p>
        </CardContent>
      </Card>
    )
  }

  const { id, name, agents = [], relationships = 'Unknown' } = agentSystem

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name || 'Unnamed System'}</CardTitle>
        <Badge variant="secondary" className="mt-1">
          {relationships} System
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {Array.isArray(agents) && agents.length > 0 ? (
            agents.map((agent) => (
              <div key={agent.id} className="flex justify-between items-center">
                <span>{agent.name} ({agent.role})</span>
                <div className="flex gap-1">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No agents in this system</p>
          )}
        </div>
        <Link href={`/customize-agent/${id}`} passHref>
          <Button variant="outline" className="w-full">
            Customize Agent System
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

