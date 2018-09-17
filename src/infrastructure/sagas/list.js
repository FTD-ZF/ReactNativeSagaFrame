import { put, take, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/actionsTypes';
import { GETAA } from '../../commons/utils/request';
import { CustomerUrl } from '../../commons/utils/urls';


export function* handleListAction(action) {
  try {
    //可根据后台实际返回数据 进行判定
    const resp = yield call(GETAA, CustomerUrl + action.page + '/15')
    if (resp) {
      yield put({ type: Types.RECEIVE_LIST_SUCCESS, success: resp.data, page: action.page })
    } else {
      yield put({ type: Types.RECEIVE_LIST_ERROR, error: '数据异常' })
    }

  } catch (error) {
    // console.log(error);
    yield put({ type: Types.RECEIVE_LIST_ERROR, error: '数据异常' })
  }

}


export default function* watchList() {

  yield takeLatest(Types.FETCH_LIST, handleListAction)

}



