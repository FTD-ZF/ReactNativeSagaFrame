import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/infrastructure/store/configureStore';
import rootSaga from './src/infrastructure/sagas';
import App from './src/components/Navigation/navState';
import { Toast, Theme } from 'teaset';
import JPushModule from 'jpush-react-native';

const store = configureStore();
// run root saga
store.runSaga(rootSaga);

Theme.set({ fitIPhoneX: true });

export default class app extends Component {

  //此处极光推送相关功能暂且放在一个页面
  componentWillMount() {

    //初始化极光推送
    if (Platform.OS === 'android') {
      JPushModule.initPush();
      //点击事件必备
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
      })
    } else {
      JPushModule.setupPush();
    }
  }

  componentDidMount() {
    this.setAlias('123456');//设置alias--此处一般设置在登陆成功后

    //通知栏收到消息时的监听
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("ANreceive notification**********: ", message);
    });

    //点击跳转页面
    JPushModule.addReceiveOpenNotificationListener((map) => {
      Toast.message('点击了通知');
    });
  }


  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    JPushModule.removeReceiveOpenNotificationListener();
    JPushModule.clearAllNotifications();
    this.deleteAlias();//删除alias--此处一般写在退出登陆下
  }

  setAlias = (userId) => {

    JPushModule.setAlias(userId, map => {
      if (map.errorCode === 0) {
        console.log('set alias succeed')
      } else {
        console.log('set alias failed, errorCode: ' + map.errorCode)
      }
    })

  }

  deleteAlias = () => {
    console.log('Deleting alias')
    JPushModule.deleteAlias(map => {
      if (map.errorCode === 0) {
        console.log('delete alias succeed')
      } else {
        console.log('delete alias failed, errorCode: ' + map.errorCode)
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

