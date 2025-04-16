import styled from "styled-components"
import { taskDeleted, type Task } from "../features/tasks/tasksSlice"
import { LucideCheck, LucideTrash2 } from "lucide-react"
import type { TaskStatusProps } from "./TaskStatus"
import TaskStatus from "./TaskStatus"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"

type TaskProps = {
  task: Task
} & TaskStatusProps

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;
  background-color: #ffffff;
  border: 1px solid #bbddd6;

  .taskName {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 80%;

      .checkmark {
        color: ${({ theme }) => theme.colors.icons.success};
      }
    }
  }
`

const TaskComp = ({ task, textColor, bgColor, icon, text }: TaskProps) => {
  const dispatch = useAppDispatch()
  const assignees = useAppSelector((state: RootState) => state.tasks.assignees)
  const assigneeName = assignees[task.assigneeId] || "Unknown Assignee"

  // where are ids of a task ???????//// well whatever name works
  const handleRemoveTaskClick = (taskName: string) => {
    dispatch(taskDeleted(taskName))
  }

  return (
    <TaskContainer>
      <div className="taskName">
        <div>
          <button>
            <LucideCheck className="checkmark" />
          </button>
          <input defaultValue={task.taskName} placeholder="Новая задача" />
        </div>
        <button
          onClick={() => {
            handleRemoveTaskClick(task.taskName)
          }}
        >
          <LucideTrash2 />
        </button>
      </div>
      <p>{assigneeName}</p>
      <TaskStatus
        textColor={textColor}
        bgColor={bgColor}
        icon={icon}
        text={text}
      />
    </TaskContainer>
  )
}

export default TaskComp
