import { StructuredAgentCreator } from '@/components/structured-agent-creator'

export default function CreateAgentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Create Your Agent System</h1>
      <StructuredAgentCreator />
    </div>
  )
}

