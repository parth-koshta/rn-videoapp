import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingVertical: 5
  },
  colWrapper: {width: '80%'},
  name: {fontSize: 12, fontWeight: 'bold'},
  comment: {paddingLeft: 10, fontSize: 12},
  time: {
    fontSize: 8,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  mainStyle: {
    marginTop: 20,
  },
});
