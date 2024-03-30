import { createSlice, nanoid, current } from '@reduxjs/toolkit';


const getFromLocalStorage = (key) => {
  if (!key || typeof window === 'undefined') {
    return ""
  }
  return localStorage.getItem(key)
}

const initialState = {
  cartData: getFromLocalStorage("value") ? JSON.parse(getFromLocalStorage("value") || '{}') : [],
};

const userSlice = createSlice({
  name: "CartData",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const payLoad = action.payload;
      state.cartData.push(payLoad);
      const resp = JSON.stringify(current(state.cartData));
      localStorage.setItem("value", resp);
    },
    RemoveCart: (state, action) => {
      const updatedData = state.cartData.filter((item) => item.id !== action.payload);
      state.cartData = updatedData;
      const resp = JSON.stringify(updatedData);
      localStorage.setItem("value", resp);
    },
  },
});

// Export actions and reducer
// these are the actions will call when we will send data to redux store
export const { AddCart, RemoveCart } = userSlice.actions;

// this is reducer will use in store
export default userSlice.reducer;