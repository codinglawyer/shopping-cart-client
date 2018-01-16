import { take, put, call, apply } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { setCurrentUser, GET_CURRENT_USER_INFO } from '../actions'

export function* currentUserSaga() {
  const { id } = yield take(GET_CURRENT_USER_INFO )
  const response = yield call(fetch, `http://localhost:8081/user/${id}`)
  const data = yield apply(response, response.json)
  yield put(setCurrentUser(data))
}