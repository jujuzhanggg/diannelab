import { MultiAgentSystem } from '@/components/multi-agent-system'

export default function MultiAgentSystemPage({ params }: { params: { systemId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Multi-Agent System</h1>
      <MultiAgentSystem systemId={params.systemId} />
    </div>
  )
}

