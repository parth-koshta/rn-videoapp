import React, {Component} from 'react';
import {View} from 'react-native';
import {CustomInput, CustomButton} from '../../Components';
import styles from './styles';
import {registerWithFirebase, signIn} from '../../APIs';

export default class LoginSignup extends Component {
  constructor(props) {
    super(props);
    let {method} = this.props.route.params;
    this.method = method;
    this.state = {
      formValues: {
        email: '',
        password: '',
        username: '',
      },
    };
  }

  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  setFormField = (key, value) => {
    this.setState(state => ({
      formValues: {
        ...state.formValues,
        [key]: value.trim(),
      },
    }));
  };

  authenticate = () => {
    if (!this.validate(this.state.formValues.email)) {
      alert('Please enter correct email.');
    } else if (!this.state.formValues.password) {
      alert('Password cannot be blank');
    } else {
      if (this.method === 'login') {
        signIn(this.state.formValues.email, this.state.formValues.password);
      } else if (this.method === 'signup') {
        if (!this.state.formValues.username) {
          alert('Username cannot be blank.');
        } else {
          registerWithFirebase(
            this.state.formValues.email.trim(),
            this.state.formValues.password,
            this.state.formValues.username,
          );
        }
      }
    }
  };

  render() {
    const {email, password, signup, login, username} = this.state;
    return (
      <View style={styles.container}>
        {this.method === 'signup' && (
          <CustomInput
            value={username}
            accessoryViewId={'username'}
            label="Username"
            onChangeText={text => this.setFormField('username', text)}
          />
        )}

        <CustomInput
          value={email}
          accessoryViewId={'email'}
          label="Email"
          autoCapitalize="none"
          onChangeText={text => this.setFormField('email', text)}
        />

        <CustomInput
          value={password}
          accessoryViewId={'password'}
          label="Password"
          onChangeText={text => this.setFormField('password', text)}
        />
        <CustomButton
          label={this.method === 'login' ? 'Login' : 'Sign Up'}
          onPress={this.authenticate.bind(this)}
        />
      </View>
    );
  }
}
