import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text> HomeScreen </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
