import { AgentCustomizer } from '@/components/agent-customizer'

export default function CustomizeAgentPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customize Your Agent System</h1>
      <AgentCustomizer agentId={params.id} />
    </div>
  )
}

