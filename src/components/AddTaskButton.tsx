import { Plus } from "lucide-react"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import { taskAdded } from "../features/tasks/tasksSlice"
import type { Task } from "../features/tasks/tasksSlice"
import { useState } from "react"

const Button = styled.button<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
`

const AddTaskButton = ({ color, taskType }: { color: string, taskType: 'waiting' | 'inProgress' | 'completed' }) => {
  const dispatch = useAppDispatch()
  const [taskName, setTaskName] = useState<string>('')
  const [assigneeId, setAssigneeId] = useState<number>(0)

  const handleAddTaskClick = () => {

    let statusId: number

    if (taskType === 'waiting') {
      statusId = 0
    } else if (taskType === 'inProgress') {
      statusId = 1
    } else {
      statusId = 2
    }

    const newTask: Task = {
      taskName,
      statusId,
      assigneeId,
    }

    // Dispatch the new task to the Redux store
    dispatch(taskAdded(newTask))

    // Optionally clear the inputs after adding the task
    setTaskName('')
    setAssigneeId(0)
  }

  return (
    <Button color={color} onClick={handleAddTaskClick}>
      <Plus style={{ width: "1.25rem", height: "1.25rem" }} />
      <span>Новая задача</span>
    </Button>
  )
}

export default AddTaskButton
