import { fork, take, call, apply, put } from 'redux-saga/effects'
import { SET_CART_ITEMS, setItemDetails } from './../actions'
import fetch from 'isomorphic-fetch'

export function* loadItemDetails (item){
  const { id } = item
  const response = yield call(fetch, `http://localhost:8081/items/${id}`)
  const itemDetails = yield apply(response, response.json)
  yield put(setItemDetails(itemDetails[0]))
}

export function* itemsDetailsSaga() {
  const { items } = yield take(SET_CART_ITEMS)
  yield items.map(item => fork(loadItemDetails, item))
}
