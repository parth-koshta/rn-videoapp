import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '90%',
    marginVertical: 20,
  },
  input: {
    backgroundColor: Colors.BLACK,
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 8,
    paddingLeft: 10,
    color: Colors.WHITE,
    height: 60,
  },
  placeholderWrapper: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 5,
  },
  label: {
    color: Colors.RED,
  },
});

export default styles;
