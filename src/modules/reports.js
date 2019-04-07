import axios from 'axios'
import { CHANGE_REQUEST_CONDITIONS_PAGE } from 'modules/requestConditions'
import { CHANGE_PAGINATION } from './pagination'

export const PULL_REPORTS_FROM_DB = 'PULL_REPORTS_FROM_DB'
export const ADD_NEXT_PAGE_REPORTS_FROM_DB = 'ADD_NEXT_PAGE_REPORTS_FROM_DB'
export const ADD_PREV_PAGE_REPORTS_FROM_DB = 'ADD_PREV_PAGE_REPORTS_FROM_DB'
export const FILTER_REPORTS_BY_NAME = 'FILTER_REPORTS_BY_NAME'

export const getReports = (dispatch, conditions) => new Promise(async resolve => {
  const reports = await axios.post('/api/reports/get-reports-secure', conditions)
  const paginationObj = { ...reports.data }
  if (paginationObj.docs) {
    delete paginationObj.docs
  }
  dispatch({ type: CHANGE_PAGINATION, payload: paginationObj })
  dispatch({ type: PULL_REPORTS_FROM_DB, payload: reports.data.docs })
  resolve()
})

export const getNextPageReports = () => {
  return async (dispatch, getState) => {
    if (getState().pagination.hasNextPage) {
      dispatch({ type: CHANGE_REQUEST_CONDITIONS_PAGE, payload: (getState().requestConditions.page + 1) })
      const reports = await axios.post('/api/reports/get-reports-secure', { ...getState().requestConditions, page: getState().requestConditions.page })
      const paginationObj = { ...reports.data }
      if (paginationObj.docs) {
        delete paginationObj.docs
      }
      dispatch({ type: CHANGE_PAGINATION, payload: paginationObj })
      dispatch({ type: ADD_NEXT_PAGE_REPORTS_FROM_DB, payload: reports.data.docs })
      return Promise.resolve('1')
    }
  }
}

export const getFilteredReports = () => {
  return async (dispatch, getState) => {
    const reports = await axios.post('/api/reports/get-reports-secure', { ...getState().requestConditions })
    const paginationObj = { ...reports.data }
    if (paginationObj.docs) {
      delete paginationObj.docs
    }
    dispatch({ type: CHANGE_PAGINATION, payload: paginationObj })
    return Promise.resolve('1')
  }
}

const initialState = []
const filterState = (state, filter) => {
  const newState = state
  return newState.filter(i => filter.includes(i.author))
}

const reports = (state = initialState, action) => {
  switch (action.type) {
  case PULL_REPORTS_FROM_DB:
    return action.payload
    break
  case ADD_NEXT_PAGE_REPORTS_FROM_DB:
    return [ ...state, ...action.payload ]
    break
  case ADD_PREV_PAGE_REPORTS_FROM_DB:
    const newArr = [ ...state ]
    newArr.length()
    return [ ...action.payload, ...newArr.splice(4, 4) ]
    break
  case FILTER_REPORTS_BY_NAME:
    if (action.payload.length) {
      const filteredArr = filterState(state, action.payload)
      return filteredArr
    } else {
      return state
    }
    break
  default:
    break
  }
  return state
}

export default reports
