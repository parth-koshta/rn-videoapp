import {StyleSheet} from 'react-native';
import { Colors } from '../../Theme';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1
  },
  inputWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK,
    color: Colors.BLACK,
  },
  inputStyleProp: {
    padding: 0,
    marginVertical: 0,
  }
});
