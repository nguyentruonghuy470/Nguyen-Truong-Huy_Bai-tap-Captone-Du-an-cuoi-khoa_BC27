import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "apis/userAPI";
const initialState = {
  users: [],
  isLoading: null,
  error: "",
  detaisUser: {},
  search: "",
  searchUser: [],
};
export const getAllUser = createAsyncThunk(
  "project/getAllUser",
  async (acces, { rejectWithValue }) => {
    try {
      const data = await userAPI.getAllUser();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const CreateUsers = createAsyncThunk(
  "project/CreateUser",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const data = await userAPI.createUserApi(values);
      dispatch(getAllUser());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      // console.log(title)
      const data = await userAPI.deleteUserApi(title.userId, title.acc);
      dispatch(getAllUser());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "project/updateUser",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const data = await userAPI.updateUserApi(values);
      // dispatch(getAllUser())
      // return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await userAPI.searchUser(title.value, title.acce);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    getdetailUser: (state, { payload }) => {
      state.detaisUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    
    builder.addCase(searchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchUser.fulfilled, (state, { payload }) => {
      state.searchUser = payload;
      state.isLoading = false;
    });
    builder.addCase(searchUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});
export const { getdetailUser, changeSearch } = userSlices.actions;
export default userSlices.reducer;
