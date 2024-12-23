import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface AgentGoalSetterProps {
  goal: string
  setGoal: (goal: string) => void
}

export function AgentGoalSetter({ goal, setGoal }: AgentGoalSetterProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="agent-goal">Agent Goal</Label>
      <Textarea
        id="agent-goal"
        placeholder="Enter the goal for this agent..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows={3}
      />
    </div>
  )
}

