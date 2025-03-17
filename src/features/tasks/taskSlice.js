import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTaksByUserID,
  taskRegisterAPI,
  updateTaksAPI,
  deleteTaskAPI,
} from "../../services/tasks";

const initialState = {
  loading: false,
  content: [],
  httpStatus: null,
  status: null,
  flag: false,
  message: null,
};

export const getTask = createAsyncThunk("task/user", async (userId) => {
  const data = await getTaksByUserID(userId);
  return data;
});

export const registerTask = createAsyncThunk("task/register", async (body) => {
  const data = await taskRegisterAPI(body);
  return data;
});

export const updateTask = createAsyncThunk("task/update", async (body) => {
  const data = await updateTaksAPI(body);
  return data;
});

export const deleteTaks = createAsyncThunk("task/delete", async (taskId) => {
  const data = await deleteTaskAPI(taskId);
  return data;
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.httpStatus = null;
      state.message = null;
      state.status = null;
      state.flag = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload.httpStatus === 200 &&
          action.payload.content.length > 0
        ) {
          state.httpStatus = action.payload.httpStatus;
          state.status = action.payload.status;
          state.content = action.payload.content;
        }
      })
      .addCase(registerTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerTask.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload.httpStatus === 201 &&
          action.payload.status === "success"
        ) {
          state.httpStatus = action.payload.httpStatus;
          state.status = action.payload.status;
          state.content.push(action.payload.content);
          state.message = action.payload.message;
          state.flag = true;
        }
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === "success"
        ) {
          state.httpStatus = action.payload.httpStatus;
          state.status = action.payload.status;
          const index = state.content.findIndex(
            (task) => task._id === action.payload.updated._id
          );
          state.content[index] = action.payload.updated;
          state.message = action.payload.message;
          state.flag = true;
        }
      })
      .addCase(deleteTaks.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaks.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === "success"
        ) {
          state.httpStatus = action.payload.httpStatus;
          state.status = action.payload.status;
          const index = state.content.findIndex(
            (task) => task._id === action.payload.deleted._id
          );
          state.content.splice(index, 1);
          state.message = action.payload.message;
          state.flag = true;
        }
      });
  },
});

export const { clearState } = taskSlice.actions;
export const selectTaskState = (state) => state.tasks;
export default taskSlice.reducer;
