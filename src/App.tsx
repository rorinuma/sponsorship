import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { fetchTaskData } from "./features/tasks/tasksSlice"
import { useEffect } from "react"
import styled from "styled-components"
import type { RootState } from "./app/store"
import TaskColumn from "./components/TaskColumn"
import { NotepadText, Zap } from "lucide-react"
import { theme } from "./styles/theme"

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  margin: 1rem;
`

const TasksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 90dvh;
  gap: 1rem;
  flex: 10;
`

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const App = () => {
  const dispatch = useAppDispatch()
  const { tasks, assignees, statuses, loading } = useAppSelector(
    (state: RootState) => state.tasks,
  )

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchTaskData()).unwrap()
      } catch (error) {
        console.error("Failed to fetch task data:", error)
      }
    }
    loadData()
  }, [dispatch])

  const waitingTasks = tasks.filter(task => task.statusId === 0)
  const inProgressTasks = tasks.filter(task => task.statusId === 1)
  const doneTasks = tasks.filter(task => task.statusId === 2)

  return (
    <>
      <AppLayout>
        <TasksContainer>
          <TaskColumn
            icon={<Zap style={{ width: "1rem", height: "1rem" }} />}
            bgColor={theme.colors.background.skyBlue}
            textColor={theme.colors.text.skyBlue}
            text="В ожидании"
            taskAmount={waitingTasks.length}
            containerBgColor={theme.colors.containerBackground.skyBlue}
            tasks={waitingTasks}
            taskType="waiting"
          />
          <TaskColumn
            icon={<NotepadText style={{ width: "1rem", height: "1rem" }} />}
            bgColor={theme.colors.background.orange}
            textColor={theme.colors.text.orange}
            text="В работе"
            taskAmount={inProgressTasks.length}
            containerBgColor={theme.colors.containerBackground.orange}
            tasks={inProgressTasks}
            taskType="inProgress"
          />
          <TaskColumn
            icon={<NotepadText style={{ width: "1rem", height: "1rem" }} />}
            bgColor={theme.colors.background.blue}
            textColor={theme.colors.text.blue}
            text="Готово"
            taskAmount={doneTasks.length}
            containerBgColor={theme.colors.containerBackground.blue}
            tasks={doneTasks}
            taskType="completed"
          />
        </TasksContainer>
        <ProgressBar></ProgressBar>
      </AppLayout>
    </>
  )
}
