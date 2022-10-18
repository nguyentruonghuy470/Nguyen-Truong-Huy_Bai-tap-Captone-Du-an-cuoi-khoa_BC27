import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";
import taskReducer from "reducer/taskReducer";
import taskSlices from "modules/ProjectDetail/slices/taskSlices";
// import userSlices from "modules/ProjectDetail/slices/userSlices";
const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskReducer,
    taskS: taskSlices,
    // user: userSlices,
  },
});

export default store;
