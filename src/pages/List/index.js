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
import request from 'superagent';

import * as ListActions from '../../infrastructure/actions/list';
import * as Types from '../../infrastructure/constants/actionsTypes';
import ListSelector from '../../infrastructure/selector/listSelector';
import connect from '../../infrastructure/store/connect';
let page = 1;
let data = [];

@connect(ListSelector, ListActions)
export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  constructor(props) {
    super(props);

    this.state = {
      refreshState: false,

    };
  }

  componentWillMount() {

  }


  componentDidMount() {
    // this._request(1);
    this.props.actions.fetchList(1);
  }

  _request(page) {
    request('GET', CustomerUrl + page + '/10').then(
      success => {
        if (page == 1) {
          this.setState({ dataList: success.body.data, refreshState: false })
        } else {
          this.setState({ dataList: this.state.dataList.concat(success.body.data), refreshState: false })
        }

      },
      failure => { return failure });
  }




  _keyExtractor = (item, index) => {
    const { keyExtractor } = this.props;
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    return index.toString();
  };

  _renderItem(item) {
    return (
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ padding: 20 }}>{item.addUserName}</Text>
        <View style={AppStyles.line} />
      </View>
    )
  }

  refreshing() {
    page = 1;
    this.setState({ refreshState: true });
    // this._request(page);
    this.props.actions.fetchList(page);
  }

  _onload() {
    page++;
    this.props.actions.fetchList(page);
  }

  //此处this.props中指向的数据是上一次的，当前的数据还需使用nextProps
  componentWillReceiveProps(nextProps) {
    if (nextProps.list.data.type == Types.RECEIVE_LIST_SUCCESS) {
      let page = nextProps.list.data.page;
      if (page == 1) {
        data = nextProps.list.data.success;
        this.setState({ refreshState: false });
      } else {
        data = data.concat(nextProps.list.data.success);
      }
    } else {
      Toast.message(nextProps.list.data.error);
    }
  }

  render() {


    return (

      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => this._renderItem(item)}
          onRefresh={() => this.refreshing()}
          refreshing={this.state.refreshState}
          onEndReachedThreshold={0.1}
          onEndReached={() => this._onload()}
          keyExtractor={this._keyExtractor} />
      </View>

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

