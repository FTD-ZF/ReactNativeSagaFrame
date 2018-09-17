import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/infrastructure/store/configureStore';
import rootSaga from './src/infrastructure/sagas';
import App from './src/components/Navigation/navState';
import { Theme } from 'teaset';
const store = configureStore();
// run root saga
store.runSaga(rootSaga);

Theme.set({ fitIPhoneX: true });

export default class app extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

