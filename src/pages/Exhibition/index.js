import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { AppColors, AppStyles } from '../../commons/styles';

import { Toast, PopoverPicker } from 'teaset';



export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: '展示页面',

  });
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }




  render() {

    return (
      <View style={styles.container}>
        <ScrollView>

          <TouchableOpacity style={{ padding: 15 }}>
            <Text>暂未开垦</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

})
