import { all, take, put, call, apply, fork } from 'redux-saga/effects'
import {
  SET_CART_ITEMS,
  SET_CURRENT_USER,
  SET_ITEM_DETAILS,
  setItemPrice
} from './../actions'
import fetch from 'isomorphic-fetch'

export function * fetchItemPrice(itemId, currency){
  const response = yield call(
    fetch,
    `http://localhost:8081/prices/${currency}/${itemId}`
  )
  const itemDetails = yield apply(response, response.json)
  yield put(setItemPrice(itemId, itemDetails[0].price))
}

export function* itemPriceSaga() {
  const [{ user }, { items }] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS)
  ])
  yield items.map(item=> fork(fetchItemPrice, item.id, user.country))
}
