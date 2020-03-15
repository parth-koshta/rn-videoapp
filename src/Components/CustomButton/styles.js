import {StyleSheet} from 'react-native';
import { Colors } from '../../Theme';

export default styles = StyleSheet.create({
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
