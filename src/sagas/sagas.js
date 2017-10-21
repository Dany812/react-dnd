import { takeEvery, call } from 'redux-saga/effects';
import { saveData } from '../api/save'; 
import { REQUEST_BLOCK } from '../actions/BlockAction'; 

const url = 'http://localhost:3000/';

function* post(action) {
  const save = yield call(saveData, url, action.block);
  if(!save) { console.log('err') }
}

export default function* saga() {
  yield takeEvery(REQUEST_BLOCK, post); 
}