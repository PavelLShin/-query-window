import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import filterSlice from './filterSlice'
import itemSlice from './itemSlice'

const store = configureStore({
  reducer: {
    dataSlice: dataSlice,
    filterSlice: filterSlice,
    itemSlice: itemSlice,
  },
})

export default store
