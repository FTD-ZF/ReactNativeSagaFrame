import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { AppColors, AppStyles } from '../../commons/styles';
import { Toast, Drawer } from 'teaset';
import FirstItemView from '../../components/HomeItemVIew/FirstItemView';



export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: '首页',
    headerLeft: <TouchableOpacity
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
    </TouchableOpacity>
  });
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      strName: '未登录'
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showDrawer: () => this._showDrawer(),
      testCallBack: (str) => this._callBack(str),
    });
  }

  componentDidMount() {

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
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

})
