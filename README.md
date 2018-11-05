# ReactNativeSagaFrame
RN开发（一切尽在代码中）
### 安装运行(已适配Android和iOS)
1.    yarn install
2.    react-native run-android or react-native run-ios 
### 相关问题处理
###### 由于用到的组件在适配Android和iOS中不是很完善,所以需要修改node_modules包中的内容;对于初用RN开发项目的朋友,尽量不要去改这个node_modules包
        
##### 一开始运行项目出现proptypes相关错误--来自扫描二维码组件问题说明 https://www.jianshu.com/p/8e8bc89bfe2c
* 需要去node_modules包中,修改react-native-smart-barcode中Barcode.js文件,去除本身引用的PropTypes,
  重新添加import PropTypes from 'prop-types',如果没有就重新依赖prop-types包
  
##### 图表组件相关问题处理
* ECharts设置 需要去node_modules/native-echarts/src/components/ECharts/index.js修改部分代码
* 禁止显示滑动条和滑动：改为scrollEnabled={Platform.OS === 'ios' ? false : true}和scalesPageToFit={Platform.OS === 'ios' ? false : true}
* 打包问题：ios暂无，安卓端：将node_modules/native-echarts/src/components/ECharts/tpl.html文件拷贝到安卓项目下面的app/src/main/assets文件夹中,并且修改：source={Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' }}

##### 图片-音频-视频组件
* 注意相关权限添加
##### 高德地图定位功能
* 组件分别是react-native-amap3d和react-native-amap-geolocation
* 需要去高德开放平台申请key
* 安卓端根据相关说明进行配置,暂未遇到繁琐问题--Android studio需安装kotlin插件
* iOS端问题  目前对于地图相关组件,iOS端需要安装CocoaPods 
* xcode基本会遇到node_modules包中third-party问题/n
   解决方式 来自https://github.com/facebook/react-native/issues/19774/n
    1.项目根目录下cd node_modules/react-native/n
    2.执行 scripts/ios-install-third-party.sh/n
    3.接着 cd third-party 再cd glog-0.3.x  这个‘x‘就是看本地的这个glog版本了/n
    4.最后执行 ./configure/n


    

    
