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
} from 'react-native';

import { Toast, } from 'teaset';
import { AppColors, AppStyles } from '../../commons/styles';
import * as Types from '../../infrastructure/constants/actionsTypes';
import ECharts from 'native-echarts';

export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor(props) {
        super(props);

        this.state = {
            data: [{ EChartsType: 'line' }, { EChartsType: 'bar' }, { EChartsType: 'pie' }],
        };
    }

    componentWillMount() {

    }

    /*
    ECharts设置 需要去node_modules/native-echarts/src/components/ECharts/index.js修改部分代码
    1.禁止显示滑动条和滑动：改为scrollEnabled={true}和scalesPageToFit={true}
    2.打包问题：ios暂无，安卓端：将node_modules/native-echarts/src/components/ECharts/tpl.html文件拷贝到安卓项目下面的app/src/main/assets文件夹中 
    修改：source={Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' }}
    （由于是此处正好是用到这个组件，所以需要修改node_modules包中的内容；
        对于初用RN开发项目的朋友，尽量不要去改这个node_modules包）
    */

    _keyExtractor(item, index) {
        return index.toString();
    }


    render() {

        return (

            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => this._keyExtractor(item, index)}
                renderItem={(item) => this._renderEChartsView(item)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}//横向滚动条隐藏
            />

        );
    }


    _renderEChartsView(itemData) {
        const option = {
            title: {
                text: '标题'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: itemData.item.EChartsType,
                symbolSize: 10,
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        return (
            <ECharts option={option}
                height={300}
                width={AppStyles.screen_width}
                scrollEnable={true} />
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

