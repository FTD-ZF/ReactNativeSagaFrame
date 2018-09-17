import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Toast, PullPicker } from 'teaset';
import { AppColors, AppStyles } from '../../commons/styles';
import Loading from '../../commons/utils/loading';
import dismissKeyboard from 'dismissKeyboard';
import * as LoginActions from '../../infrastructure/actions/login';
import * as Types from '../../infrastructure/constants/actionsTypes';
import LoginSelector from '../../infrastructure/selector/loginSelector';
import connect from '../../infrastructure/store/connect';


@connect(LoginSelector, LoginActions)
export default class LoginView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title
  });

  constructor(props) {
    super(props);

    this.state = {
      userName: '',//账号
      password: '',//密码
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  clickLogin() {
    dismissKeyboard();
    Loading.show();
    let PARAMS = {
      username: this.state.userName,
      password: this.state.password,
    }
    this.props.actions.fetchLogin(PARAMS);
  }

  componentWillReceiveProps(nextProps) {
    Loading.hidden();
    if (nextProps.login.data.type == Types.FETCH_LOGIN_SUCCESS) {
      Toast.success(nextProps.login.data.success);
      this._goBack(nextProps.login.data.success);
    } else {
      Toast.message(nextProps.login.data.error);
      this._goBack(nextProps.login.data.error);
    }
  }

  _goBack(str) {
    this.props.navigation.state.params.callBack(str);
    this.props.navigation.goBack();
  }
  componentWillUnmount() {
    Loading.hidden();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.view, { marginTop: 10 }]} >
          <Text style={styles.text}>账号</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({ userName: text })}
            value={this.state.userName}
            underlineColorAndroid={'transparent'}
            placeholder={'请输入账号'} />
        </View>
        <View style={AppStyles.line} />
        <View style={styles.view} >
          <Text style={styles.text}>密码</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid={'transparent'}
            placeholder={'请输入密码'}
            secureTextEntry={true} />
        </View>
        <TouchableOpacity style={{
          margin: 15, marginTop: 30, backgroundColor: AppColors.themecolor, height: 44, borderRadius: 5, justifyContent: 'center', alignItems: 'center',
        }}
          onPress={() => this.clickLogin()}>
          <Text style={{ color: 'white', fontSize: 17 }}>登录</Text>
        </TouchableOpacity>
      </View >
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dddddd',
  },
  text: {
    color: AppColors.themecolor,
    width: 60,
    fontSize: 15,
    marginLeft: 15
  },
  textInput: {
    flex: 1,
    color: AppColors.dark3,
    height: 44,
    fontSize: 15,
    marginRight: 15,
    width: AppStyles.screen_width - 60,
    padding: 0,
    height: 44
  },
  view: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44
  },
});
