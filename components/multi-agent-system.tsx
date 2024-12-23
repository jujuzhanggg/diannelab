"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send } from 'lucide-react'

interface Message {
  id: string
  from: string
  content: string
  timestamp: string
}

interface MultiAgentSystemProps {
  systemId: string
}

export function MultiAgentSystem({ systemId }: MultiAgentSystemProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const agents = [
    { id: 'manager', name: 'Manager', color: 'bg-purple-100' },
    { id: 'worker-1', name: 'Research Agent', color: 'bg-blue-100' },
    { id: 'worker-2', name: 'Analysis Agent', color: 'bg-green-100' },
  ]

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, newMessage])
    setInput('')

    // Simulate agent responses
    setTimeout(() => {
      const agentMessage: Message = {
        id: Date.now().toString(),
        from: 'manager',
        content: "I'll coordinate with the team to help with your request.",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages(prev => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg flex items-center space-x-2 ${agent.color}`}
              >
                <Brain className="w-4 h-4" />
                <span>{agent.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.from === 'user' ? 'bg-purple-100' : 'bg-gray-100'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {message.from === 'user' ? 'You' : 'Agent'}
                    </p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center space-x-2 mt-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

