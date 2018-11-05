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
} from 'react-native';

import { Toast, } from 'teaset';
import { AppColors, AppStyles } from '../../commons/styles';
import * as Types from '../../infrastructure/constants/actionsTypes';
import Barcode from 'react-native-smart-barcode';

//扫描二维码组件问题说明 https://www.jianshu.com/p/8e8bc89bfe2c
/*一开始运行项目出现proptypes相关错误 ，需要去node_modules包中，
           修改react-native-smart-barcode中Barcode.js文件，
           去除本身引用的PropTypes,重新添加import PropTypes from 'prop-types'
           如果没有就重新依赖prop-types包
*/
export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {

    }

    _onBarCodeRead = (e) => {
        console.log(e.nativeEvent.data.code + '');
        this._stopScan();
        Alert.alert("二维码", e.nativeEvent.data.code, [
            { text: '确认', onPress: () => this._startScan() },
        ])
    };

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    render() {

        return (
            // <View style={{ flexDirection: 'column' }}>
            <Barcode
                style={{ flex: 1, }}
                ref={component => this._barCode = component}
                onBarCodeRead={this._onBarCodeRead}
                scannerRectCornerColor='#38ADFF'//扫描线颜色-需16进制的色值不然iOS报错
                scannerLineInterval={2000}//扫描线移动的间隔事件
            />
            // </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dddddd',
    },
});

