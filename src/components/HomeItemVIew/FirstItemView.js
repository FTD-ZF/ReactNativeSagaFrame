import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import { AppColors, AppStyles } from '../../commons/styles';


export default class FirstItemView extends Component {
  render() {
    const { title, onPress, } = this.props;

    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity style={{ padding: 15, justifyContent: 'center', flexDirection: 'row' }} onPress={onPress}>
          <Text style={{ color: AppColors.dark3, fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
        <View style={AppStyles.line} />
      </View>
    )

  }

}




