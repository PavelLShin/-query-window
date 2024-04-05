import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchData = createAsyncThunk(
  'dataSlice/fetchData',
  async (url) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
)

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.push(action.payload)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return (state = action.payload)
    })
  },
})

export const { addData } = dataSlice.actions

export const selectData = (state) => state.dataSlice
export default dataSlice.reducer
