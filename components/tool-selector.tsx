import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const AVAILABLE_TOOLS = [
  { id: 'web-search', name: 'Web Search' },
  { id: 'summarize', name: 'Summarize' },
  { id: 'post-tweet', name: 'Post Tweet' },
  { id: 'like-tweet', name: 'Like Tweet' },
  { id: 'pdf-analysis', name: 'PDF Analysis' },
  { id: 'data-visualization', name: 'Data Visualization' },
]

interface ToolSelectorProps {
  selectedTools: string[]
  onToolToggle: (toolId: string) => void
}

export function ToolSelector({ selectedTools, onToolToggle }: ToolSelectorProps) {
  return (
    <div className="space-y-2">
      {AVAILABLE_TOOLS.map((tool) => (
        <div key={tool.id} className="flex items-center space-x-2">
          <Checkbox
            id={tool.id}
            checked={selectedTools.includes(tool.id)}
            onCheckedChange={() => onToolToggle(tool.id)}
          />
          <Label htmlFor={tool.id}>{tool.name}</Label>
        </div>
      ))}
    </div>
  )
}

