import { put, take, actionChannel } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { SET_SHIPPING_FETCH_STATUS, setCanCheckOut, FETCHED } from '../actions'

export function* checkoutAvailabilitySaga() {
  const chan = yield actionChannel(SET_SHIPPING_FETCH_STATUS)
  while (true) {
    const { status } = yield take(chan)
    yield put(setCanCheckOut(status === FETCHED))
  }
}
