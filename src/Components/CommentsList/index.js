import React from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';

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

const seperator = () => {
  return <View style={{height: 10}} />;
};

const CommentsList = ({comments}) => {
  let commentsList = Object.values(comments);
  return (
    <FlatList
      data={commentsList}
      keyExtractor={item => item.time.toString()}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 5,
              borderBottomWidth: 0.5,
            }}>
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                {item.userName}:
              </Text>
              <Text style={{paddingLeft: 10, fontSize: 12}}>
                {item.comment}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 8,
                alignSelf: 'flex-end',
                fontWeight: 'bold',
              }}>
              {getFormattedDate(item.time)}
            </Text>
          </View>
        );
      }}
      style={{
        marginTop: 20
      }}
      ItemSeparatorComponent={() => seperator()}
    />
  );
};

export default CommentsList;
