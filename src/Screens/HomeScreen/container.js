import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {AuthContext} from '../AuthNavigator/utils';

export default class HomeScreen extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.user = this.context;
  }

  render() {
    return (
      <AuthContext.Consumer>
        {props => {
          return (
            <View>
              <Header />
            </View>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
