import { TreeOfThoughts } from '@/components/tree-of-thoughts'

export default function TreeOfThoughtsPage({ params }: { params: { agentId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Tree of Thoughts Workflow</h1>
      <TreeOfThoughts agentId={params.agentId} />
    </div>
  )
}

