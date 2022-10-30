import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "apis/projectAPI";
import userAPI from "apis/userAPI";
// import { getProjectDetails } from "modules/List/slices/taskSlices";
import { getTaskDetail } from "./taskSlices";
const initialState = {
  data: [],
  isLoading: null,
  error: "",
  update: [],
  list: [],
  listuser: [],
};

export const getProjectAll = createAsyncThunk(
  "project/getProjectAll",
  async (acces, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getProjectAll(acces);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProjectAuthorize = createAsyncThunk(
  "project/createProject",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.createProjectAuthorize(
        title.values,
        title.acce
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      const data = await projectAPI.deleteProject(title.projectId, title.acces);
      dispatch(getProjectAll());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserByProjectId = createAsyncThunk(
  "project/getUserByProjectId",
  async (title, { rejectWithValue }) => {
    try {
      const data = await userAPI.getUserByProjectId(title.setid, title.acces);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectCategory = createAsyncThunk(
  "project/getProjectCategory",
  async (_, { rejectWithValue }) => {
    try {
      const dataz = await projectAPI.getProjectCategory();
      return dataz;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// export const updateProjects = createAsyncThunk(
//   "project/updateProject",
//   async (title, { rejectWithValue }) => {
//     try {
//       const data = await projectAPI.updateProjects(
//         title.values,
//         title.projectId,
//         title.acce,
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const assignUserProject = createAsyncThunk(
  "project/assignUserProject",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      const data = await projectAPI.addUserForProject(title.info, title.acces);
      console.log(data);
      // dispatch(getTaskDetail({taskId : title.values.projectId, acce : title.acces}))
      dispatch(getProjectAll());

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProjectById = createAsyncThunk(
  "project/updateProjectById",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      const data = await projectAPI.updateProjectById(
        title.values,
        title.projectId,
        title.acce
      );
      dispatch(getProjectAll());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectAllById = createAsyncThunk(
  "project/getProjectAllById",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getProjectAllById(
        title.projectId,
        title.acce
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeUserz = createAsyncThunk(
  "project/removeUseroject",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await userAPI.removeUserProject(title.values, title.acces);
      // dispatch(
      //   getUserByProjectId({
      //     projectId: title.values.projectId,
      //     acce: title.acces,
      //   })
      // );
      dispatch(getProjectAll());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const projectSlices = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectAll.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectAll.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getProjectCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectCategory.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectCategory.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getProjectAllById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectAllById.fulfilled, (state, { payload }) => {
      state.update = payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectAllById.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export default projectSlices.reducer;
