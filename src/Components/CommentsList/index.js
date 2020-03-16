import React from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const getFormattedDate = date => {
    var date = new Date(date);
    var str =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();
    return str;
  };

const CommentsList = ({comments}) => {
  let commentsList = Object.values(comments);
  return (
    <FlatList
      data={commentsList}
      keyExtractor={item => item.time.toString()}
      renderItem={({item, index}) => {
          console.log(item, 'item from list')
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 5,
              borderBottomWidth: 0.5,
            }}>
            <View>
              <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                {item.userName}
              </Text>
              <Text style={{paddingLeft: 10}}>
                {item.comment}
              </Text>
            </View>

            <Text style={{fontSize: 8, alignSelf: 'flex-end'}}>
              {getFormattedDate(item.time)}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default CommentsList;
