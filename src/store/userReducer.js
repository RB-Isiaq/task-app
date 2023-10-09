import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: null,
  name: "",
  username: "",
  password: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      const { id, name, username, password } = action.payload;
      state.id = id;
      state.name = name;
      state.username = username;
      state.password = password;
    },
  },
});

export default user.reducer;
export const { storeUser } = user.actions;
