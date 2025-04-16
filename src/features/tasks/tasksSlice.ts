import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export type Task = {
  taskName: string
  assigneeId: number
  statusId: number
}

export type Dictionary = {
  assignees: Record<string, string>
  statuses: Record<string, string>
}

export type TasksState = {
  tasks: Task[]
  assignees: Record<string, string>
  statuses: Record<string, string>
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  assignees: {},
  statuses: {},
  loading: false,
  error: null,
}

type FetchTaskDataResponse = Pick<
  TasksState,
  "tasks" | "assignees" | "statuses"
>

export const fetchTaskData = createAsyncThunk<FetchTaskDataResponse>(
  "tasks/fetchData",
  async (): Promise<FetchTaskDataResponse> => {
    const dataResponse = await fetch("/data/data.json")
    const dictionaryResponse = await fetch("/data/dictionay.json")

    const data: Task[] = (await dataResponse.json()) as Task[]
    const dictionary: Dictionary =
      (await dictionaryResponse.json()) as Dictionary

    return {
      tasks: data,
      assignees: dictionary.assignees,
      statuses: dictionary.statuses,
    }
  },
)

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskDeleted: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.taskName !== action.payload)
    },
    taskAdded: (state, action: PayloadAction<Task>) => {
      console.log(action.payload)
      state.tasks.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTaskData.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchTaskData.fulfilled,
        (state, action: PayloadAction<FetchTaskDataResponse>) => {
          state.loading = false
          state.tasks = action.payload.tasks
          state.assignees = action.payload.assignees
          state.statuses = action.payload.statuses
        },
      )
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Unknown error"
      })
  },
})

export const { taskDeleted, taskAdded } = tasksSlice.actions
export default tasksSlice.reducer
