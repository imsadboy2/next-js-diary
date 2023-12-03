import { configureStore, createSlice } from "@reduxjs/toolkit";


let imgurl = createSlice({
  name: 'imgurl',
  initialState : '',
  reducers: {
    changeimgurl(state, action){
      return action.payload
    }
  }
})

export default configureStore({
  reducer: {
    imgurl: imgurl.reducer
  }
})

export let {changeimgurl} = imgurl.actions