import { ChainOfThoughts } from '@/components/chain-of-thoughts'

export default function ChainOfThoughtsPage({ params }: { params: { agentId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Chain of Thoughts Workflow</h1>
      <ChainOfThoughts agentId={params.agentId} />
    </div>
  )
}

