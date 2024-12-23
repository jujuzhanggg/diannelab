"use client"

import { useDrag, useDrop } from 'react-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface WorkflowStep {
  id: string
  type: string
  content: string
}

interface WorkflowStepProps {
  step: WorkflowStep
  index: number
  moveStep: (dragIndex: number, hoverIndex: number) => void
}

const WorkflowStep = ({ step, index, moveStep }: WorkflowStepProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'WORKFLOW_STEP',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'WORKFLOW_STEP',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveStep(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-2">
        <CardContent className="p-4">
          <div className="font-semibold">{step.type}</div>
          <div>{step.content}</div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AgentWorkflowProps {
  workflow: WorkflowStep[]
  setWorkflow: React.Dispatch<React.SetStateAction<WorkflowStep[]>>
}

export function AgentWorkflow({ workflow, setWorkflow }: AgentWorkflowProps) {
  const moveStep = (dragIndex: number, hoverIndex: number) => {
    const dragStep = workflow[dragIndex]
    setWorkflow((prevWorkflow) => {
      const newWorkflow = [...prevWorkflow]
      newWorkflow.splice(dragIndex, 1)
      newWorkflow.splice(hoverIndex, 0, dragStep)
      return newWorkflow
    })
  }

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type: 'New Step',
      content: 'Configure this step',
    }
    setWorkflow((prevWorkflow) => [...prevWorkflow, newStep])
  }

  return (
    <div>
      {workflow.map((step, index) => (
        <WorkflowStep key={step.id} step={step} index={index} moveStep={moveStep} />
      ))}
      <Button onClick={addStep} className="mt-4">
        Add Step
      </Button>
    </div>
  )
}

