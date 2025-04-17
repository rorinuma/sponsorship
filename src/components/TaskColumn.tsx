import styled from "styled-components"
import TaskStatus from "./TaskStatus"
import type { Task } from "../features/tasks/tasksSlice"
import TaskComp from "./Task"
import AddTaskButton from "./AddTaskButton"

export type TaskColumnProps = {
  icon: React.ReactNode
  text: string
  bgColor: string
  textColor: string
  containerBgColor: string
  taskAmount: number
  tasks: Task[]
  taskType: "waiting" | "inProgress" | "completed"
}

export type TaskContainerProps = {
  containerBgColor: string
}

const ColumnWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.25rem;
  min-width: 20rem;
`

const TasksContainer = styled.div<TaskContainerProps>`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  gap: 1rem;
  padding: 0.75rem;
  height: 100%;
  background-color: ${({ containerBgColor }) => containerBgColor};
  justify-content: space-between;

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`

const TaskColumn = ({
  icon,
  text,
  bgColor,
  textColor,
  taskAmount,
  containerBgColor,
  tasks,
  taskType,
}: TaskColumnProps) => {
  return (
    <ColumnWrapper>
      <TaskStatus
        icon={icon}
        text={text}
        bgColor={bgColor}
        textColor={textColor}
        taskAmount={taskAmount}
      />
      <TasksContainer containerBgColor={containerBgColor}>
        <div className="tasks">
          {tasks.map((task, id) => (
            <TaskComp
              key={id}
              task={task}
              text={text}
              icon={icon}
              bgColor={bgColor}
              textColor={textColor}
            />
          ))}
        </div>
        <AddTaskButton color={textColor} taskType={taskType} />
      </TasksContainer>
    </ColumnWrapper>
  )
}

export default TaskColumn
