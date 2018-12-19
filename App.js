import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/infrastructure/store/configureStore';
import rootSaga from './src/infrastructure/sagas';
import App from './src/components/Navigation/navState';
import { Toast, Theme } from 'teaset';
import JPushModule from 'jpush-react-native';
import CodePush from 'react-native-code-push';
import { AppStyles } from './src/commons/styles';
// import SafeAreaView from 'react-native-safe-area-view';
// import { SafeAreaView } from 'react-navigation';

const store = configureStore();
// run root saga
store.runSaga(rootSaga);

Theme.set({ fitIPhoneX: true });

export default class app extends Component {

  //此处极光推送相关功能暂且放在一个页面
  componentWillMount() {
    CodePush.disallowRestart();//禁止重启
    this._toUpApp();

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

    CodePush.allowRestart();//加载完了允许重启

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

  _toUpApp() {

    CodePush.sync({
      // updateDialog: {
      //   appendReleaseDescription: true,
      //   descriptionPrefix: '更新内容',
      //   title: '更新',
      //   mandatoryUpdateMessage: '',
      //   mandatoryContinueButtonLabel: '更新',
      // },
      mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,//下次开启更新
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

