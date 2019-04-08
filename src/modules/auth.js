import axios from 'axios'
import { getReports } from './reports'
import { getDiscordUsers } from './discordUsers'
import { getSettings } from './settings'
import { getQuestions } from './questions'

export const LOGIN_TO_SYSTEM = 'LOGIN_TO_SYSTEM'
export const EXIT_FROM_SYSTEM = 'EXIT_FROM_SYSTEM'
export const LOGIN_TO_SYSTEM_SUCCESS = 'LOGIN_TO_SYSTEM_SUCCESS'
export const LOGIN_TO_SYSTEM_FAILED = 'LOGIN_TO_SYSTEM_FAILED'
export const DATA_HAS_LOADED_AFTER_LOGIN = 'DATA_HAS_LOADED_AFTER_LOGIN'

export const loginToSystem = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_TO_SYSTEM
  })
  const res = await axios.post('/api/auth/login', getState().form.login.values)
  console.log(res)
  if (res.status === 200) {
    dispatch({
      type: LOGIN_TO_SYSTEM_SUCCESS,
      payload: auth.username
    })
    afterLogin(dispatch, getState().requestConditions)
  } else {
    dispatch({
      type: LOGIN_TO_SYSTEM_FAILED
    })
  }
}

const afterLogin = (dispatch, requestConditions) => new Promise(async resolve => {
  await getReports(dispatch, requestConditions)
  await getDiscordUsers(dispatch)
  await dispatch(getSettings())
  await dispatch(getQuestions())
  dispatch({ type: DATA_HAS_LOADED_AFTER_LOGIN })
  resolve()
})

export const onExit = dispatch => {
  dispatch({ type: EXIT_FROM_SYSTEM })
}

const initialState = {
  isLoading: false,
  isLogging: false,
  loggedIn: false,
  dataHasLoaded: false,
  login: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_TO_SYSTEM:
    return { ...state, isLogging: true, isLoading: true }
    break
  case LOGIN_TO_SYSTEM_SUCCESS:
    return { ...state, login: action.payload, isLogging: false, loggedIn: true }
    break
  case LOGIN_TO_SYSTEM_FAILED:
    return { ...state, login: '', isLogging: false, loggedIn: false }
    break
  case EXIT_FROM_SYSTEM:
    return { ...state, loggedIn: false, login: '' }
    break
  case DATA_HAS_LOADED_AFTER_LOGIN:
    return { ...state, dataHasLoaded: true, isLoading: false }
    break
  default:
    break
  }
  return state
}

export default auth
