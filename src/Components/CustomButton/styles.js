import {StyleSheet} from 'react-native';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 4
  },
  label: {
      color: Colors.RED,
      fontWeight: 'bold',
      fontSize: 16
  }
});

export default styles;