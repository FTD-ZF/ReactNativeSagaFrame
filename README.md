# ReactNativeSagaFrame
RN开发（一切尽在代码中）
### 安装运行(已适配Android和iOS)
1.    yarn install
2.    react-native run-android or react-native run-ios 
### 相关问题处理
* 一开始运行项目出现proptypes相关错误-来自扫描二维码组件问题说明 https://www.jianshu.com/p/8e8bc89bfe2c
 处理方式：需要去node_modules包中,修改react-native-smart-barcode中Barcode.js文件,去除本身引用的PropTypes,
 重新添加import PropTypes from 'prop-types',如果没有就重新依赖prop-types包
