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

let itemPosition = 0;

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
    1.禁止显示滑动条和滑动：改为scrollEnabled={Platform.OS === 'ios' ? false : true}和scalesPageToFit={Platform.OS === 'ios' ? false : true}
    2.打包问题：ios暂无，安卓端：将node_modules/native-echarts/src/components/ECharts/tpl.html文件拷贝到安卓项目下面的app/src/main/assets文件夹中 
    修改：source={Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' }}
    （由于是此处正好是用到这个组件，所以需要修改node_modules包中的内容；
        对于初用RN开发项目的朋友，尽量不要去改这个node_modules包）
    */

    _keyExtractor(item, index) {
        return index.toString();
    }

    //上一个
    _lastOnePress() {
        itemPosition--;
        if (itemPosition < 0) {
            itemPosition = 0;
            return
        }
        this.refs._flatlist.scrollToIndex({ viewPosition: 0, index: itemPosition });
    }

    //下一个
    _nextOnePress() {
        itemPosition++;
        if (itemPosition > this.state.data.length - 1) {
            itemPosition = this.state.data.length - 1;
            return
        }
        this.refs._flatlist.scrollToIndex({ viewPosition: 0, index: itemPosition });
    }

    //监听滚动距离 width为屏幕宽
    _onScroll(event) {
        console.log(event.nativeEvent.contentOffset.x + '');
    }

    render() {

        return (
            <View style={{ flexDirection: 'column' }}>
                <FlatList
                    ref='_flatlist'
                    data={this.state.data}
                    keyExtractor={(item, index) => this._keyExtractor(item, index)}
                    renderItem={(item) => this._renderEChartsView(item)}
                    onScroll={(event) => this._onScroll(event)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}//横向滚动条隐藏
                    getItemLayout={(data, index) => ({ length: AppStyles.screen_width, offset: AppStyles.screen_width * index, index })}
                />

                <View style={{
                    flexDirection: 'row',
                    height: 50,
                }}>
                    <TouchableOpacity style={styles.firstStyle} onPress={() => this._lastOnePress()}>
                        <Text>上一个</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.firstStyle} onPress={() => this._nextOnePress()}>
                        <Text>下一个</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
    firstStyle: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        justifyContent: 'center',
        backgroundColor: 'red'

    }

});

