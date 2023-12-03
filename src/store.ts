import { configureStore, createSlice } from "@reduxjs/toolkit";


let feel = createSlice({
  name: 'feel',
  initialState : '기분없음',
  reducers: {
    changeFeel(state, action){
      return action.payload
    }
  }
})


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
    feel: feel.reducer,
    imgurl: imgurl.reducer
  }
})

export let {changeFeel} = feel.actions
export let {changeimgurl} = imgurl.actions