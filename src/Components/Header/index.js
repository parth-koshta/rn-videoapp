import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Icons} from '../../Shared';
import {signOut} from '../../APIs';
import {Colors} from '../../Theme';

const Header = ({name}) => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.WHITE,
      }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}>Hi {name}</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Image
          source={Icons.logout}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
