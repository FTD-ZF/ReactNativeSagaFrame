import { put, take, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/actionsTypes';
import { POSTAA } from '../../commons/utils/request';
import { TestLoginUrl } from '../../commons/utils/urls';

export function* handleLoginAction(action) {
  try {
    const resp = yield call(POSTAA, TestLoginUrl, action.params)
    if (resp) {
      yield put({ type: Types.FETCH_LOGIN_SUCCESS, success: '登录成功' })
    } else {
      yield put({ type: Types.FETCH_LOGIN_ERROR, error: '请输入正确的账号或密码' })
    }

  } catch (error) {
    // console.log(error);
    yield put({ type: Types.FETCH_LOGIN_ERROR, error: '数据异常' })
  }

}


export default function* watchLogin() {

  yield takeLatest(Types.FETCH_LOGIN, handleLoginAction)

}



