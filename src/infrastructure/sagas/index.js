import { delay } from 'redux-saga';
import { call, spawn, takeEvery, all } from 'redux-saga/effects';
import * as Types from '../constants/actionsTypes';
import watchList from './list';
import watchLogin from './login';

const makeRestartable = saga => {
  const loop = true
  return function* restartable() {
    yield spawn(function* task() {
      while (loop) {
        try {
          yield call(saga)
          const errMsg =
            "unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!"

          console.error(errMsg, saga)
        } catch (e) {
          console.error("Saga error, the saga will be restarted", e)
        }
        // Avoid infinite failures blocking app TODO use backoff retry policy...
        yield delay(1000)
      }
    })
  }
}


const watchListSagas = [watchList].map(makeRestartable);
const wacthLoginSagas = [watchLogin].map(makeRestartable);
// const watchpoliceSagas = [watchpolice].map(makeRestartable)

// function* watchFetchLogin() {
//   yield takeEvery(types.LOGIN_TYPE, watchlogin);
// }

export default function* rootSaga() {
  yield watchListSagas.map(saga => call(saga))
  yield wacthLoginSagas.map(saga => call(saga))
  // yield watchpoliceSagas.map(saga => call(saga))
}
