import { createSlice } from "@reduxjs/toolkit";
import { getData, postData } from "../services/ApiClient";

const initialState = {
  tasks: [],
  task: [],
};

const tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    create: (state, action) => {
      let prevTasks = getData("tasks");
      if (!prevTasks) prevTasks = [];
      prevTasks.push(action.payload);
      postData("tasks", prevTasks);
      state.tasks = prevTasks;
    },
    update: (state, action) => {
      let allTasks = getData(`tasks`);
      const singleTask = allTasks.filter(
        (task) => task.id === action.payload.id
      );
      const singleIdx = allTasks.indexOf(singleTask[0]);
      allTasks.splice(singleIdx, 1, action.payload);

      postData("tasks", allTasks);
      state.tasks = allTasks;
    },
    deleteTask: (state, action) => {
      const allTasks = getData(`tasks`);
      let otherTasks;
      otherTasks = allTasks.filter((task) => task.id !== action.payload);
      if (!otherTasks) return;

      if (allTasks.length === 1) {
        postData("tasks", []);
        state.tasks = [];
      } else {
        postData("tasks", otherTasks);
        state.tasks = otherTasks;
      }
    },
    getAllTasks: (state) => {
      const storedTasks = getData("tasks");
      if (!storedTasks) return;

      state.tasks = storedTasks;
    },
    getTask: (state, action) => {
      const allTasks = getData(`tasks`);
      const singleTask = allTasks.filter((task) => task.id === action.payload);
      state.task = singleTask[0];
    },
  },
});

export default tasks.reducer;
export const { setTasks, create, update, deleteTask, getAllTasks, getTask } =
  tasks.actions;
