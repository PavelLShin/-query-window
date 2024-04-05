import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: '',
  author: '',
  type: '',
  status: '',
}

const filterSlice = createSlice({
  name: 'filter',

  initialState,

  reducers: {
    setDataFilter: (state, action) => {
      state.data = action.payload
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload
    },
    setTypeFilter: (state, action) => {
      state.type = action.payload
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload
    },

    resetFilters: () => {
      return initialState
    },
  },
})

export const {
  setDataFilter,
  setAuthorFilter,
  setTypeFilter,
  setStatusFilter,
  resetFilters,
} = filterSlice.actions

export const selectDatafilter = (state) => {
  return state.filterSlice.data
}

export const selectAuthorFilter = (state) => {
  return state.filterSlice.author
}

export const selectTypeFilter = (state) => {
  return state.filterSlice.type
}

export const selectStatusFilter = (state) => {
  return state.filterSlice.status
}

export default filterSlice.reducer
