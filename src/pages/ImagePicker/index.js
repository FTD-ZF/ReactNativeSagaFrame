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
    Platform,
    ScrollView,
    Modal,
} from 'react-native';

import { Toast, } from 'teaset';
import { AppColors, AppStyles } from '../../commons/styles';
import * as Types from '../../infrastructure/constants/actionsTypes';
import ButtonRadius from '../../components/Button/ButtonRadius';
import ImagePicker from 'react-native-image-crop-picker';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound'; // 播放声音组件
// import VideoRecorder from 'react-native-beautiful-video-recorder';
import ImageViewer from 'react-native-image-zoom-viewer';

let pathNum = 0;//用于音频文件路径设置中

export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            imgViewArray: [],
            recodingtxt: '状态',
            recoding: true,
            modalVisible: false,
            index: 0,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            // this.setState({ hasPermission: isAuthorised });

            if (!isAuthorised) return;

            AudioRecorder.onProgress = (data) => {
                // this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    //设置录音文件相关信息
    prepareRecordingPath(num) {
        let audioPath = AudioUtils.DocumentDirectoryPath + '/test' + num.toString() + '.aac';
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",//录音质量
            AudioEncoding: "aac",//录音格式
            AudioEncodingBitRate: 32000//比特率
        });
    }

    //删除图片
    _deletepic(item) {
        // delete this.state.data[item.index]//data的length不变
        this.state.data.splice(item.index, 1);
        this.setState({ data: this.state.data });
    }

    //选择图片库
    _selectImage() {
        ImagePicker.openPicker({
            mediaType: 'photo',//photo video any三种
            multiple: true
        }).then(images => {
            images.map(content => {
                this.state.data.push(content.path)
            });
            this.setState({
                data: this.state.data,
            });

        })
    }

    //拍照
    _takePhoto() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true//可裁剪--影响视频选择
        }).then(image => {
            this.state.data.push(image.path);
            this.setState({ data: this.state.data });
        });
    }

    //拍摄视频
    _selectVideo() {
        ImagePicker.openPicker({
            mediaType: 'video',
        }).then((video) => {
            this.state.data.push(video.path);
            this.setState({ data: this.state.data });
        });
    }

    //音频录制
    async _takeRadio() {
        if (this.state.recoding) {
            pathNum++;
            this.prepareRecordingPath(pathNum);
            try {
                await AudioRecorder.startRecording();
            } catch (error) {
                console.error(error);
            }
            this.setState({
                recoding: false,
                recodingtxt: '录制中...'
            })
        } else {
            try {
                const filePath = await AudioRecorder.stopRecording();

                if (Platform.OS === 'android') {
                    this._finishRecording(true, filePath);
                }

            } catch (error) {
                console.error(error);
            }

        }
    }

    //ios端获取录音文件需要走onfinished(),所以此处集中处理两端文件路径
    _finishRecording(didSucceed, filePath, fileSize) {
        this.state.data.push(filePath);
        this.setState({
            recoding: true,
            recodingtxt: '录制结束',
            data: this.state.data,
        })
    }

    //点击播放录音
    _clickItemRadio(item) {
        setTimeout(() => {
            let sound = new Sound(item.item, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });
            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }


    //图片查看
    _showPicture(content) {
        this.setState({ modalVisible: true });
    }

    _closeModal() {
        this.setState({ modalVisible: false });
    }
    _keyExtractor(item, index) {
        return index.toString();
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    style={{ marginLeft: 10, marginRight: 10 }}
                    data={this.state.data}
                    renderItem={(item) => this._renderItem(item)}
                    numColumns={4}
                    keyExtractor={(item, index) => this._keyExtractor(item, index)}
                    horizontal={false}
                />

                <ButtonRadius title='图片选择' onPress={() => this._selectImage()} />
                <ButtonRadius title='拍照' onPress={() => this._takePhoto()} />
                <ButtonRadius title='选择已拍视频' onPress={() => this._selectVideo()} />
                <ButtonRadius title={'音频录制(' + this.state.recodingtxt + ')'} onPress={() => this._takeRadio()} />
                {this._showModal()}
            </ScrollView>

        );
    }


    _renderItem(item) {
        if (item.item.indexOf('.aac') != -1) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this._clickItemRadio(item)}>
                        <Image style={{ width: (AppStyles.screen_width - 60) / 4, height: 85, margin: 5 }}
                            source={require('../../commons/assets/icon_record.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._deletepic(item)}>
                        <Text>{item.index}删除</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this._showPicture(item)}>
                        <Image style={{ width: (AppStyles.screen_width - 60) / 4, height: 85, margin: 5 }}
                            source={{ uri: item.item }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._deletepic(item)}>
                        <Text>{item.index}删除</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _showModal() {
        let imgs = [];
        this.state.data.map((content) => {
            if (content) {
                if (content.indexOf('.aac') != -1) {
                    return
                } else if (content.indexOf('.mp4') != -1) {
                    return
                } else {
                    let arr = { url: content };
                    imgs.push(arr);
                }
            }
        });

        return (
            <Modal visible={this.state.modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => this.setState({ modalVisible: false })}>
                <ImageViewer imageUrls={imgs}
                    index={this.state.index}
                    onSwipeDown={() => {
                        console.log('onSwipeDown');
                    }}
                    enableSwipeDown={true}
                    onClick={() => this._closeModal()}
                />
            </Modal>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dddddd',
    },

});

