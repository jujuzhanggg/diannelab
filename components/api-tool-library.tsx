import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const API_TOOLS = [
  { id: 'openai', name: 'OpenAI GPT' },
  { id: 'google-search', name: 'Google Search' },
  { id: 'weather-api', name: 'Weather API' },
  { id: 'news-api', name: 'News API' },
  { id: 'twitter-api', name: 'Twitter API' },
  { id: 'database', name: 'Database Query' },
]

interface ApiToolLibraryProps {
  selectedTools: string[]
  onToolSelect: (tool: string) => void
}

export function ApiToolLibrary({ selectedTools, onToolSelect }: ApiToolLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTools = API_TOOLS.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">API Tool Library</h3>
      <div>
        <Label htmlFor="tool-search">Search Tools</Label>
        <Input
          id="tool-search"
          type="text"
          placeholder="Search for tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {filteredTools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTools.includes(tool.id) ? 'default' : 'outline'}
            onClick={() => onToolSelect(tool.id)}
          >
            {tool.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

