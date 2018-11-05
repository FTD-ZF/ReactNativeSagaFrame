import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    NativeModules,
    AsyncStorage,
    FlatList,
    Alert,
    PermissionsAndroid,
} from 'react-native';

import { Toast, } from 'teaset';
import { AppColors, AppStyles } from '../../commons/styles';
import * as Types from '../../infrastructure/constants/actionsTypes';
import { MapView } from 'react-native-amap3d';
import { Geolocation } from "react-native-amap-geolocation";//定位获取当前详细信息


//安卓端根据相关说明进行配置--Android studio需安装kotlin插件
//iOS端会遇到点问题
/*  首先共同的问题，xcode基本会遇到node_modules包中third-party问题
    解决方式 来自https://github.com/facebook/react-native/issues/19774
    1.项目根目录下cd node_modules/react-native
    2.执行 scripts/ios-install-third-party.sh
    3.接着 cd third-party 再cd glog-0.3.x  这个‘x‘就是看本地的这个glog版本了
    4.最后执行 ./configure
*/

/*
    相关功能组件来自https://github.com/qiuxiang/react-native-amap3d
    iOS中导入地图相关问题
    此处高德地图导入不像安卓直接link就行了，而是要用到CocoaPods在iOS原生中集成第三方的库
    所以需安装CocoaPods，完成相关安装
    最后在iOS目录下,执行pod install 可能会出现问题
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
*/
//以上问题 每次在npm instll 或者yarn add新组件时，都会发生

// let latitude = 39.806901;
// let longitude = 116.397972;

export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor(props) {
        super(props);

        this.state = {
            // latitude: 39.806901,
            // longitude: 116.397972,
            markerList: [{ description: '内容', latitude: 39.806901, longitude: 116.397972, },]
        };
    }
    componentDidMount() {


    }

    componentWillMount() {
        this.requestMultiplePermission();
        Geolocation.setOptions({
            interval: 30000,//定位请求间隔，默认 2000 毫秒，仅用于 Android
            distanceFilter: 10,//最小更新距离，默认 0 米，即只要位置更新就立即返回，仅用于 iOS
            reGeocode: true,
        });
        Geolocation.addLocationListener(location =>
            this.updateLocationState(location)
        );
        Geolocation.start();
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    //定位数据
    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date(location.timestamp).toLocaleString()
            if (this.state.markerList[0].latitude != location.latitude || this.state.markerList[0].longitude != location.longitude) {
                // latitude = location.latitude;
                // longitude = location.longitude;
                this.state.markerList[0].latitude = location.latitude;
                this.state.markerList[0].longitude = location.longitude;
                this.state.markerList[0].description = location.address;
                this.setState({ test: 1 });
            }
        }
    }


    _logPressEvent = ({ nativeEvent }) => console.log('onPress', nativeEvent)
    _logLongPressEvent = ({ nativeEvent }) => console.log('onLongPress', nativeEvent)
    _logLocationEvent = ({ nativeEvent }) => console.log('LocationEvent', nativeEvent)
    _logStatusChangeCompleteEvent = ({ nativeEvent }) => console.log('onStatusChangeComplete', nativeEvent)


    //此处获取一个当前位置并获取位置信息
    render() {


        return (
            <MapView
                style={{ flex: 1, }}
                // showsLocationButton={true}//定位功能按钮iOS不支持，SDK就不支持
                // showsCompass={true}//指南针
                // showsScale={false}//比例尺
                // showsZoomControls={true}//缩放功能iOS不支持
                zoomLevel={15}
                // locationEnabled={true}
                // onLocation={({ nativeEvent }) => {
                //     this.setState({
                //         longitude: nativeEvent.longitude,
                //         latitude: nativeEvent.latitude
                //     });
                // }}
                coordinate={{
                    latitude: this.state.markerList[0].latitude,
                    longitude: this.state.markerList[0].longitude,
                }}

            // onPress={this._logPressEvent}
            // onLongPress={this._logLongPressEvent}
            // onLocation={this._logLocationEvent}
            // onStatusChangeComplete={this._logStatusChangeCompleteEvent}
            >

                {this.state.markerList.map((content, index) => {

                    return <MapView.Marker
                        // image='flag'
                        key={index}
                        icon={() => (
                            <Image source={require('../../commons/assets/icon_location.png')}
                                style={{ width: 40, height: 40 }} />
                        )}
                        coordinate={{
                            latitude: content.latitude,
                            longitude: content.longitude,
                        }}>
                        <View style={{
                            width: AppStyles.screen_width / 2, height: 80,
                            backgroundColor: 'black', opacity: 0.5, padding: 15
                        }}>
                            <Text style={{ color: 'white', alignItems: 'center', }}>{content.description}</Text>
                        </View>
                    </MapView.Marker>
                })
                }

            </MapView>
        );
    }


    async requestMultiplePermission() {
        try {
            const permissions = [
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.CAMERA
            ]
            //返回得是对象类型
            const granteds = await PermissionsAndroid.requestMultiple(permissions)
            var data = "是否同意地址权限: "
            if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
                data = data + "是\n"
            } else {
                data = data + "否\n"
            }
            data = data + "是否同意相机权限: "
            if (granteds["android.permission.CAMERA"] === "granted") {
                data = data + "是\n"
            } else {
                data = data + "否\n"
            }
            data = data + "是否同意存储权限: "
            if (granteds["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted") {
                data = data + "是\n"
            } else {
                data = data + "否\n"
            }
            this.show(data)
        } catch (err) {
            this.show(err.toString())
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dddddd',
    },
});

