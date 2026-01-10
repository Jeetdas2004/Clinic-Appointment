import { createSlice } from "@reduxjs/toolkit";

export  const navItemSlice=createSlice({
   name:'navItem',
   initialState:{name:'Home'},
   reducers:{
      updateItem(state,action){
        state.name=action.payload
      }
   }
})


export const navItemActions=navItemSlice.actions;
export default navItemSlice