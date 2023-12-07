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

let searchdata = createSlice({
  name: 'searchdata',
  initialState : [],
  reducers: {
    changesearchdata(state, action){
      return action.payload
    }
  }
})

let backurl = createSlice({
  name: 'backurl',
  initialState : '',
  reducers: {
    changebackurl(state, action){
      return action.payload
    }
  }
})

export default configureStore({
  reducer: {
    feel: feel.reducer,
    imgurl: imgurl.reducer,
    searchdata: searchdata.reducer,
    backurl: backurl.reducer
  }
})

export let {changeFeel} = feel.actions
export let {changeimgurl} = imgurl.actions
export let {changesearchdata} = searchdata.actions
export let {changebackurl} = backurl.actions