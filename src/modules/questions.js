import axios from 'axios'

export const GET_QUESTIONS_FROM_DB = 'GET_QUESTIONS_FROM_DB'
export const SET_QUESTIONS = 'SET_QUESTIONS'

export const getQuestions = (dispatch) => {
  return async (dispatch, getState) => {
    const settings = await axios.get('/api/questions/get-questions-secure')
    dispatch({ type: GET_QUESTIONS_FROM_DB, payload: settings.data })
    Promise.resolve()
  }
}

export const setQuetion = (num, text) => {
  return async (dispatch, getState) => {
    await axios.post('/api/questions/set-questions-secure', { num: (num + 1), text })
    Promise.resolve()
    dispatch(getQuestions())
  }
}

export const addQuestion = (num, text) => {
  return async (dispatch, getState) => {
    await axios.post('/api/questions/set-questions-secure', { num: (num + 1), text })
    Promise.resolve()
    dispatch(getQuestions())
  }
}



const initialState = {
  data: []
}

const questions = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS_FROM_DB:
    const initialValuesArray = action.payload.map(question => question.text)
    return { ...initialState, data: action.payload, initialValuesArray }
    break
  default:
    break
  }
  return state
}

export default questions
