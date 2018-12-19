import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { AppColors, AppStyles } from '../../commons/styles';

import { Toast, PopoverPicker } from 'teaset';


//此处用的是react-native-code-push,用code-push命令进行部署；
//code-push安装及注册账号此处就不详细描述了；
//以项目为例 code-push app add ReactNativeSagaFrame android react-native 在code-push里面添加一个新的app，这里Android和iOS共用一个key
//在根目录App.js中进行相关设置，项目中就不弹出提示框了，设置为再次进入app进行更新，并且强制更新
//这里是在Production环境进行热更新，Android端与iOS端注意设置key设置正确
//每次更新前，需要先把js打包成 bundle，此处是执行 yarn run bundle-android或者yarn run bundle-ios
//Android端部署（此处可不设置版本号，执行命令时会自动读取，版本号需设置"x.x.x"，Android端设置“versionName”即可，若为生产环境需要指定的，Staging则可以不指定，描述和是否强制更新也可选设置）
// 执行 code-push release-react ReactNativeSagaFrame android -d Production  --des "Android端更新" -m true
//iOS端部署 此项目由于使用了CocoaPods，注意在Podfile文件中查看配置路径是否正确
// 执行 code-push release-react ReactNativeSagaFrame ios -d Production  --des "iOS端更新" -m true
//查询部署历史 code-push deployment history ReactNativeSagaFrame Production

export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'CodePush',
   
  });
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }




  render() {

    return (
      <View style={styles.container}>
        <ScrollView>

          <TouchableOpacity style={{ padding: 15 }}>
            <Text>你好,我是Code-Push!</Text>
            <Text>添加一个内容试试11</Text>
          </TouchableOpacity>

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
