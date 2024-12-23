import { WorkflowSelector } from '@/components/workflow-selector'

export default function WorkflowSelectionPage({ params }: { params: { agentId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Workflow</h1>
      <WorkflowSelector agentId={params.agentId} />
    </div>
  )
}

