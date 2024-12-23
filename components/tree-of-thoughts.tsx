"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'

interface TreeOfThoughtsProps {
  agentId: string
}

interface TreeNode {
  id: string
  content: string
  children: TreeNode[]
}

export function TreeOfThoughts({ agentId }: TreeOfThoughtsProps) {
  const [tree, setTree] = useState<TreeNode>({
    id: 'root',
    content: '',
    children: []
  })

  const addBranch = (parentId: string) => {
    const newNode: TreeNode = {
      id: Date.now().toString(),
      content: '',
      children: []
    }

    const updateTree = (node: TreeNode): TreeNode => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, newNode]
        }
      }

      return {
        ...node,
        children: node.children.map(child => updateTree(child))
      }
    }

    setTree(updateTree(tree))
  }

  const updateNodeContent = (nodeId: string, content: string) => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return { ...node, content }
      }

      return {
        ...node,
        children: node.children.map(child => updateNode(child))
      }
    }

    setTree(updateNode(tree))
  }

  const renderNode = (node: TreeNode, level: number = 0) => (
    <div key={node.id} className="space-y-4" style={{ marginLeft: `${level * 2}rem` }}>
      <Card>
        <CardHeader>
          <CardTitle>Branch {level + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={node.content}
            onChange={(e) => updateNodeContent(node.id, e.target.value)}
            placeholder="Enter your thought..."
            className="min-h-[100px]"
          />
          <Button 
            onClick={() => addBranch(node.id)}
            variant="outline"
            className="mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Branch
          </Button>
        </CardContent>
      </Card>
      {node.children.map(child => renderNode(child, level + 1))}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {renderNode(tree)}
    </div>
  )
}

