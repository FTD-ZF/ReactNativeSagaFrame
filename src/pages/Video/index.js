/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Slider,
    Dimensions
} from 'react-native';
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import { FormatTime } from '../../commons/utils/FormatTime';
import AppStyles from '../../commons/styles/styles';

const playerHeight = 250;
/*
此处用到的组件为视频播放组件react-native-video和横竖屏组件react-native-orientation
视频播放组件中，注意当前RN版本号与react-native-video版本号对应，另外注意网络权限添加
react-native-orientation组件中，注意横竖屏切换时 需要调整相关高度
*/
export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });


    constructor(props) {
        super(props)
        this.player = null
        this.state = {
            rate: 1,
            slideValue: 0.00,
            currentTime: 0.00,
            duration: 0.00,
            paused: true,
            isTouchedScreen: true,
            modalVisible: true,
            isLock: false,
            orientation: 'PORTRAIT'
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }



    setDuration(duration) {
        this.setState({ duration: duration.duration })
    }
    loadStart(data) {
        console.log('loadStart', data)
    }
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime)
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime,
            modalVisible: false
        })
    }
    onTimedMetadata(data) {
        console.log('onTimedMetadata', data)
    }
    onBuffer(data) {
        console.log('onBuffer', data)
    }
    onEnd(data) {
        // this.player.seek(0)
    }
    videoError(error) {
        // this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
        this.setState({
            modalVisible: false
        })
    }

    _toChangeTouchState() {
        this.setState({
            isTouchedScreen: !this.state.isTouchedScreen,
            paused: !this.state.paused,
        })
    }
    play() {
        this.setState({
            paused: !this.state.paused,
        })
    }

    //设置竖屏
    _setlockToPortrait() {
        Orientation.lockToPortrait();
        Orientation.getOrientation((err, orientation) => {
            this.setState({ orientation });
        });
    }
    //设置横屏
    _setlockToLandscapeLeft() {
        Orientation.lockToLandscapeLeft();
        Orientation.getOrientation((err, orientation) => {
            this.setState({ orientation });
        });

    }

    render() {
        const { orientation } = this.state;

        return (
            <View
                style={{
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: orientation == 'PORTRAIT' ? playerHeight : Platform.OS === 'android' ? AppStyles.screen_width - AppStyles.AndroidStatusBarHeight : Dimensions.get('window').width - 70,

                }}
            >
                <Video source={{ uri: 'http://vfx.mtime.cn/Video/2018/12/11/mp4/181211102204851971.mp4' }}
                    ref={ref => this.player = ref}
                    rate={this.state.rate}//视频播放的速率。 0.0 - 暂停播放  1.0 - 正常速率播放
                    volume={0}//调整音量
                    muted={false}//是否静音
                    paused={this.state.paused}//控制是否暂停
                    resizeMode="cover"//确定当帧与原始视频尺寸不匹配时如何调整视频大小
                    repeat={false}//确定在到达结尾时是否重复播放视频。默认false
                    playInBackground={false}//确定应用程序在后台时是否应继续播放媒体。 这允许客户继续收听音频。
                    playWhenInactive={false}//在通知或控制中心位于视频前面时是否应继续播放媒体
                    ignoreSilentSwitch={"ignore"}//控制iOS静默开关行为-"inherit"(默认) - 使用默认的AVPlayer开关行为,"ignore" - 即使设置了静音开关，也要播放音频,"obey" - 如果设置了静音开关，请勿播放音频
                    progressUpdateInterval={250.0}//onProgress事件之间的毫秒延迟（以毫秒为单位）
                    onLoadStart={(data) => this.loadStart(data)}//媒体开始加载时调用的回调函数
                    onLoad={data => this.setDuration(data)}//加载媒体并准备播放时调用的回调函数
                    onProgress={(data) => this.setTime(data)}//视频播放过程中每个间隔进度单位（通常不足一秒，你可以打印日志测试下）调用的回调，其中包含有关媒体当前正在播放的位置的信息
                    onEnd={(data) => this.onEnd(data)}// 播放完成后的回调
                    onError={(data) => this.videoError(data)}// 播放失败后的回调
                    onBuffer={(data) => this.onBuffer(data)}//// 远程视频缓冲时的回调
                    onTimedMetadata={(data) => this.onTimedMetadata(data)}//当定时元数据可用时调用的回调函数
                    style={styles.videoPlayer}
                />





                {/* 中间的暂停按钮 */}
                <TouchableOpacity onPress={() => this._toChangeTouchState()}>
                    {this.state.paused == true ?
                        <View style={{ height: orientation == 'PORTRAIT' ? playerHeight - 50 : Platform.OS === 'android' ? AppStyles.screen_width - AppStyles.AndroidStatusBarHeight - 50 : Dimensions.get('window').width - 70 - 50, justifyContent: 'center', alignItems: 'center', }}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../commons/assets/icon_start.png')} />
                        </View> : <View style={{ height: orientation == 'PORTRAIT' ? playerHeight - 50 : Platform.OS === 'android' ? AppStyles.screen_width - AppStyles.AndroidStatusBarHeight - 50 : Dimensions.get('window').width - 70 - 50, justifyContent: 'center', alignItems: 'center', }} />
                    }
                </TouchableOpacity>
                {/* 底部进度条相关内容 */}
                {
                    <View style={styles.toolBarStyle}>

                        <TouchableOpacity onPress={() => this.play()}>
                            {this.state.paused == true ?
                                <Image style={{ width: 25, height: 25 }} source={require('../../commons/assets/icon_start.png')} />
                                : <Image style={{ width: 25, height: 25 }} source={require('../../commons/assets/icon_stop.png')} />}
                        </TouchableOpacity>
                        <View style={styles.progressStyle}>
                            <Text style={styles.timeStyle}>{FormatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                            <Slider
                                style={styles.slider}
                                value={this.state.slideValue}
                                maximumValue={this.state.duration}
                                minimumTrackTintColor={'red'}
                                maximumTrackTintColor={'green'}
                                step={1}
                                onValueChange={value => this.setState({ currentTime: value })}
                                onSlidingComplete={value => this.player.seek(value)}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 35 }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{FormatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
                            </View>

                        </View>
                        {
                            orientation == 'PORTRAIT' ?
                                <TouchableOpacity onPress={() => this._setlockToLandscapeLeft()}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../commons/assets/icon_screen_a.png')} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this._setlockToPortrait()}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../commons/assets/icon_screen_b.png')} />
                                </TouchableOpacity>
                        }


                    </View>

                }



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    videoPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    toolBarStyle: {
        backgroundColor: '#00000000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        marginTop: 10,
        height: 30
    },
    timeStyle: {
        width: 35,
        color: 'white',
        fontSize: 12
    },
    slider: {
        flex: 1,
        marginHorizontal: 5,
        height: 20
    },
    progressStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10
    },
});
