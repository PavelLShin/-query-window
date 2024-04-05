import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const itemSlice = createSlice({
  name: 'itemPageSlice',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return (state = action.payload)
    },
  },
})

export const { addItem } = itemSlice.actions

export const selectItem = (state) => state.itemSlice
export default itemSlice.reducer
