# ReactNativeSagaFrame
RN开发（一切尽在代码中）
### 安装运行(已适配Android和iOS)
###### React-Native "0.55.3" Android studio版本2.3.3  Xcode最新版 
1.    yarn install
2.    react-native run-android or react-native run-ios （另外打包bundle再去原生里运行也是可以的，相关命令已在package.json中配置）
### 相关问题处理
###### 由于用到的组件在适配Android和iOS中不是很完善,所以需要修改node_modules包中的内容;对于初用RN开发项目的朋友,尽量不要去改这个node_modules包
        
##### 一开始运行项目出现proptypes相关错误--来自扫描二维码组件问题说明 https://www.jianshu.com/p/8e8bc89bfe2c
* 安卓端，AS中修改react-native-smart-barcode库中，把RCTCapturePackage文件中createJSModules()方法的@Override注释掉
* 需要去node_modules包中,修改react-native-smart-barcode中Barcode.js文件,去除本身引用的PropTypes,
  重新添加import PropTypes from 'prop-types',如果没有就重新依赖prop-types包
  
##### 图表组件相关问题处理
* ECharts设置 需要去node_modules/native-echarts/src/components/ECharts/index.js修改部分代码
* 禁止显示滑动条和滑动：改为scrollEnabled={Platform.OS === 'ios' ? false : true}和scalesPageToFit={Platform.OS === 'ios' ? false : true}
* 打包问题：ios暂无，安卓端：将node_modules/native-echarts/src/components/ECharts/tpl.html文件拷贝到安卓项目下面的app/src/main/assets文件夹中,并且修改：source={Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' }}
##### Android和iOS屏幕适配（Android端主要设置沉浸式状态栏，iOS端主要适配iPhoneX系列的屏幕）
* Android端，在原生MainActivity中设置全屏显示，在react-navigation中的headerStyle设置相关高度，其中用到了StatusBar.currentHeight获取当前Android手机状态栏高度
* iOS端，由于引用了teaset组件并适配了iPhoneX，此处做iPhone XR,XS Max屏幕适配,此处只做了竖屏适配，依旧在react-navigation的样式中设置即可
##### 图片-音频-视频组件
* 注意相关权限添加
##### 视频播放
* 此处用到的组件为视频播放组件react-native-video和横竖屏组件react-native-orientation
视频播放组件中，注意当前RN版本号与react-native-video版本号对应，另外注意网络权限添加
react-native-orientation组件中，注意横竖屏切换时 需要调整相关高度
##### 高德地图定位功能
* 组件分别是react-native-amap3d和react-native-amap-geolocation
* 需要去高德开放平台申请key
* 安卓端根据相关说明进行配置,暂未遇到繁琐问题--Android studio需安装kotlin插件
* iOS端问题 目前对于地图相关组件,iOS端需要安装CocoaPods 
* xcode基本会遇到node_modules包中third-party相关问题  
   解决方式 来自https://github.com/facebook/react-native/issues/19774  
    1.项目根目录下cd node_modules/react-native  
    2.执行 scripts/ios-install-third-party.sh  
    3.接着 cd third-party 再cd glog-0.3.x  这个‘x‘就是看本地的这个glog版本了  
    4.最后执行 ./configure  
* 完成CocoaPods安装后,在iOS目录下,配置好Podfile文件,执行pod install 可能会出现问题  
    问题1:输出 xcrun -k --sdk iphoneos --show-sdk-path相关内容  
    解决方式：来自 https://github.com/facebook/react-native/issues/18408  
        执行 sudo xcode-select --switch /Applications/Xcode.app  
        然后再次执行 pod install 应该可以解决  
    问题2:在解决问题1后，Xcode进行build时可能会报错，还是来自third-party的问题  
    输出错误 No member named '__rip' in '__darwin_arm_thread_state64'相关内容  
    解决方式 直接点击这个错误指向的代码 把 return (void*)context->PC_FROM_UCONTEXT;改为 return NULL;  
    此解决方式来自 https://github.com/facebook/react-native/issues/16106  
    问题3: 出现RCTWebSocket 相关问题   
    解决方式 进入Build Phases中的 Link Binary With Libraries把libfishhook.a删了再重新加就可以了  
##### 极光推送集成
* 注意ios端证书问题
##### 热更新集成
* 此处用的是react-native-code-push,用code-push命令进行部署；
* code-push安装及注册账号此处就不详细描述了；
* 以项目为例 code-push app add ReactNativeSagaFrame android react-native 在code-push里面添加一个新的app，这里Android和iOS共用一个key
* 在根目录App.js中进行相关设置，项目中就不弹出提示框了，设置为再次进入app进行更新，并且强制更新
* 这里是在Production环境进行热更新，Android端与iOS端注意设置key设置正确
* 每次更新前，需要先把js打包成 bundle，此处是执行 yarn run bundle-android或者yarn run bundle-ios
* Android端部署（此处可不设置版本号，执行命令时会自动读取，版本号需设置"x.x.x"，Android端设置“versionName”即可，若为生产环境需要指定的，Staging则可以不指定，描述和是否强制更新也可选设置）
* 执行 code-push release-react ReactNativeSagaFrame android -d Production  --des "Android端更新" -m true
* iOS端部署 此项目由于使用了CocoaPods，注意在Podfile文件中查看配置路径是否正确，并且设置版本号也是"x.x.x"；
* 执行 code-push release-react ReactNativeSagaFrame ios -d Production  --des "iOS端更新" -m true
* 以项目为例查询部署历史 code-push deployment history ReactNativeSagaFrame Production


    

    
