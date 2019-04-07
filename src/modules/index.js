import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from 'modules/auth'
import reports from 'modules/reports'
import discordUsers from 'modules/discordUsers'
import requestConditions from 'modules/requestConditions'
import pagination from 'modules/pagination'
import settings from 'modules/settings'
import questions from 'modules/questions'

export default combineReducers({
  form: formReducer,
  auth,
  reports,
  discordUsers,
  requestConditions,
  pagination,
  settings,
  questions
})
