import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

import { Toast, } from 'teaset';
import { AppColors } from '../../commons/styles';



export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerTitle: "个人中心页面",


  });

  constructor(props) {
    super(props);

    this.state = {

    };
  }




  render() {

    return (
      <View style={styles.container}>
        <Text>个人中心页面</Text>

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

