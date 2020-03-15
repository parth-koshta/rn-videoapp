import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../Theme';
import {CustomInput, CustomButton} from '../../Components';
import styles from './styles';
export default class AuthHome extends Component {
  constructor(props) {
    super(props);
  }

  navigate = method => {
    this.props.navigation.navigate('Login', {method});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <CustomButton
            label="Signup"
            onPress={this.navigate.bind(this, 'signup')}
          />
          <CustomButton
            label="Login"
            onPress={this.navigate.bind(this, 'login')}
          />
        </View>
      </View>
    );
  }
}
