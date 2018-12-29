import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, RefreshControl, Modal } from 'react-native';
import { AppColors, AppStyles } from '../../commons/styles';
import { Toast, Drawer } from 'teaset';
import FirstItemView from '../../components/HomeItemVIew/FirstItemView';
import { Geolocation } from "react-native-amap-geolocation";//定位获取当前详细信息
import * as WeChat from 'react-native-wechat';
import resolveAssetSource from 'resolveAssetSource';
const strPlatform = Platform.OS === 'android' ? 'Android' : 'IOS';
const shareTitle = '来自ReactNativeSagaFrame分享(' + strPlatform + '端)';

export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: '首页',
    headerLeft: (<TouchableOpacity
      style={{ width: 40, height: 40 }}
      onPress={() => {
        navigation.state.params.showDrawer()
      }}>
      <View style={{ flexDirection: 'row', width: 50, height: 44, alignItems: 'center', marginLeft: 10, }}>
        <Image
          source={require("../../commons/assets/icon_left_more.png")}
          style={{ width: 30, height: 30, }}
        />
      </View>
    </TouchableOpacity>),

    headerRight: (<TouchableOpacity
      style={{ width: 40, height: 40 }}
      onPress={() => {
        navigation.state.params.showShareModel()
      }}>
      <View style={{ flexDirection: 'row', width: 50, height: 44, alignItems: 'center', marginRight: 10, }}>
        <Image
          source={require("../../commons/assets/icon_share.png")}
          style={{ width: 30, height: 30, }}
        />
      </View>
    </TouchableOpacity>)
  });
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      strName: '未登录',
      isModal: false
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showDrawer: () => this._showDrawer(),
      testCallBack: (str) => this._callBack(str),
      showShareModel: () => this._showShareModel(),
    });
  }

  componentDidMount() {
    this.initLocation();
    //监听分享状态
    // 'SendMessageToWX.Resp' 分享监听字段
    // 'PayReq.Resp'          支付监听字段
    // 'SendAuth.Resp'        登录监听字段
    WeChat.addListener(
      'SendMessageToWX.Resp',
      (response) => {
        if (parseInt(response.errCode) === 0) {
          Toast.message('分享成功');
        } else {
          Toast.message('分享失败');
        }
        this.setState({
          isModal: false
        });
      }
    );
  }
  componentWillUnmount() {
    WeChat.removeAllListeners();
  }


  async initLocation() {
    await Geolocation.init({
      ios: "27817fec2cab4beb102f53ed85218e0f",
      android: "d2e5cc39c0553791dc1a91a303dc3c52"
    })
  }

  //刷新
  _onRefresh() {

    this.setState({
      isRefreshing: false
    });

  }



  //跳转登录
  _doLogin() {
    this.props.navigation.navigate('LoginView', {
      title: '登录',
      callBack: (str) => this.props.navigation.state.params.testCallBack(str),
    });
  }
  //navigation中使用回调
  _callBack(str) {
    this.setState({ strName: str });
  }


  //分享弹窗
  _showShareModel() {
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          this.setState({
            isModal: true
          });
        } else {
          Toast.message('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }
  //朋友
  _shareWX_a() {

    WeChat.shareToSession({
      type: 'news',
      title: shareTitle,
      description: '欢迎Star!',
      // mediaTagName: 'email signature',
      // messageAction: 'messageaction',
      // messageExt: 'messageext',
      webpageUrl: 'https://github.com/FTD-ZF/ReactNativeSagaFrame',
      thumbImage: resolveAssetSource(require('../../commons/assets/icon_thumbimage.png')).uri
      // thumbImage: 'http://shared.ydstatic.com/dict/v5.16/images/logo-entry.png'

    })
  }
  //朋友圈
  _shareWX_b() {

    WeChat.shareToTimeline({
      type: 'news',
      title: shareTitle,
      description: '欢迎Star!',
      // mediaTagName: 'email signature',
      // messageAction: 'messageaction',
      // messageExt: 'messageext',
      webpageUrl: 'https://github.com/FTD-ZF/ReactNativeSagaFrame',
      thumbImage: resolveAssetSource(require('../../commons/assets/icon_thumbimage.png')).uri
    })
  }

  //跳转列表页面
  _toList() {
    this.props.navigation.navigate('ListView', { title: '列表页面' });
  }

  //跳转图表页面
  _toECharts() {
    this.props.navigation.navigate('ECharts', { title: '图表页面' });
  }

  //图片选择页面
  _toImagePicker() {
    this.props.navigation.navigate('ImagePicker', { title: '图片视频音频选择' });
  }

  //二维码扫描
  _toQrcode() {
    this.props.navigation.navigate('QrcodeView', { title: '扫描二维码' });
  }

  //高德地图定位
  _toMapView() {
    this.props.navigation.navigate('MapView', { title: '高德地图定位' });
  }

  //视频播放
  _toVideoPage() {
    this.props.navigation.navigate('VideoPage', { title: '视频播放' });
  }

  //展示侧拉弹窗
  _showDrawer() {
    this.drawer = Drawer.open(this.renderDrawerLayout(), 'left', 'none');
  }

  renderDrawerLayout() {
    return (
      <View style={{ backgroundColor: 'white', width: 200, flex: 1 }}>

        <TouchableOpacity onPress={() => this.drawer.close()}>
          <Text>关闭</Text>
        </TouchableOpacity>

      </View>
    )
  }

  _onRequestClose() {
    this.setState({
      isModal: false
    });
  }
  //点击外部关闭modal
  _closeModal() {
    this.setState({
      isModal: false
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
              tintColor={AppColors.themecolor}
              colors={[AppColors.themecolor]}
              title={this.state.isRefreshing ? '刷新中....' : '下拉刷新'} />
          }>

          <FirstItemView title='列表数据' onPress={() => this._toList()} />
          <FirstItemView title={'登录post请求{' + this.state.strName + '}'} onPress={() => this._doLogin()} />
          <FirstItemView title='图表组件' onPress={() => this._toECharts()} />
          <FirstItemView title='图片-视频-音频组件' onPress={() => this._toImagePicker()} />
          <FirstItemView title='二维码扫描' onPress={() => this._toQrcode()} />
          <FirstItemView title='高德地图定位' onPress={() => this._toMapView()} />
          <FirstItemView title='视频播放' onPress={() => this._toVideoPage()} />
        </ScrollView>


        <Modal

          animationType='slide'
          transparent={true}
          visible={this.state.isModal}
          onRequestClose={() => this._onRequestClose()}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }} >

            <TouchableOpacity style={{ height: AppStyles.screen_height - 80 }} onPress={() => this._closeModal()} />

            <View style={{ height: 80, backgroundColor: 'gray', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this._shareWX_a()}>
                <Image style={{ width: 75, height: 75, }} source={require('../../commons/assets/icon_share_wx_a.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._shareWX_b()}>
                <Image style={{ width: 75, height: 75, marginLeft: 10 }} source={require('../../commons/assets/icon_share_wx_b.png')} />
              </TouchableOpacity>
            </View>

          </View>

        </Modal>
      </View >
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

})
