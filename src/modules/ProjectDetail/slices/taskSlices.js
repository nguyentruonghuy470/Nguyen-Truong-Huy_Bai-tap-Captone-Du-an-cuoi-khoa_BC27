import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "apis/projectAPI";

const initialState = {
  data1: [],
  isLoading: null,
  error: "",
  getall: [],
  getallpri: [],
  getalltas: [],
  updatetask: [],
  comment: [],
};

export const getProjectAllById = createAsyncThunk(
  "task/getProjectAllById",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getProjectAllById(title.projectId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStatus = createAsyncThunk(
  "task/getStatus",
  async (_, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getStatus();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllpri = createAsyncThunk(
  "task/getAllpri",
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getPriority(projectId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAlltas = createAsyncThunk(
  "task/getAlltas",
  async (_, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getTaskType();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeTaskz = createAsyncThunk(
  "task/removetask",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await projectAPI.removeTask(title.taskId, title.acce);
      dispatch(getProjectAllById({ taskId: title.projectId, acces: title.acce }));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTaskDetail = createAsyncThunk(
  "task/getTaskDetail",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getTaskDetail(title.taskId, title.acce);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTasks = createAsyncThunk(
  "task/updateTasks",
  async (title, { rejectWithValue }) => {
    console.log(title.values);
    try {
      const data = await projectAPI.updateTasks(title.values, title.acces);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllComment = createAsyncThunk(
  "task/getAllComment",
  async (taskId, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getComment(taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const insertComment = createAsyncThunk(
  "task/insertComment",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      console.log(title);
      const data = await projectAPI.addComment(title.values, title.acces);
      dispatch(getAllComment(title.values.taskId));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "task/deleteComment",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await projectAPI.deleteComment(title.commentId, title.acces);
      dispatch(getAllComment(title.taskId));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateComment = createAsyncThunk(
  "task/updateComment",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await projectAPI.updateComment(
        title.values.id,
        title.text,
        title.acces
      );
      dispatch(getAllComment(title.values.taskId));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const taskSlices = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectAllById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectAllById.fulfilled, (state, { payload }) => {
      state.data1 = payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectAllById.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStatus.fulfilled, (state, { payload }) => {
      state.getall = payload;
      state.isLoading = false;
    });
    builder.addCase(getStatus.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAllpri.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllpri.fulfilled, (state, { payload }) => {
      state.getallpri = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllpri.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAlltas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlltas.fulfilled, (state, { payload }) => {
      state.getalltas = payload;
      state.isLoading = false;
    });
    builder.addCase(getAlltas.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getTaskDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTaskDetail.fulfilled, (state, { payload }) => {
      state.updatetask = payload;
      state.isLoading = false;
    });
    builder.addCase(getTaskDetail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAllComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllComment.fulfilled, (state, { payload }) => {
      state.comment = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllComment.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export default taskSlices.reducer;
