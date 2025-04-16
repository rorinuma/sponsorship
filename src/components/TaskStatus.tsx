import styled from "styled-components"
import type { TaskColumnProps } from "./TaskColumn"
import { theme } from "../styles/theme"

export type TaskStatusProps = Pick<TaskColumnProps, "bgColor" | "textColor" | "icon" | "text"> &
  Partial<Pick<TaskColumnProps, "taskAmount">>;
type TaskStatusContainerProps = Pick<TaskStatusProps, "bgColor" | "textColor">

const TaskStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const TaskStatusButton = styled.span<TaskStatusContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  max-height: 1.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  width: fit-content;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`

const TaskStatus = ({
  icon,
  text,
  bgColor,
  textColor,
  taskAmount,
}: TaskStatusProps) => {
  return (
    <TaskStatusContainer>
      <TaskStatusButton bgColor={bgColor} textColor={textColor}>
        {icon}

        <div>{text}</div>
      </TaskStatusButton>
      <span style={{ color: theme.colors.text.muted }}>{taskAmount}</span>
    </TaskStatusContainer>
  )
}

export default TaskStatus
