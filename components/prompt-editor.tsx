import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface PromptEditorProps {
  prompt: string
  setPrompt: (prompt: string) => void
}

export function PromptEditor({ prompt, setPrompt }: PromptEditorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="custom-prompt">Custom Prompt</Label>
      <Textarea
        id="custom-prompt"
        placeholder="Enter a custom prompt for your agent..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
      />
    </div>
  )
}

