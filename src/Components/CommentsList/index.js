import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';

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
      showsVerticalScrollIndicator={false}
      data={commentsList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <View style={styles.listWrapper}>
            <View style={styles.colWrapper}>
              <Text style={styles.name}>{item.userName}:</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>

            {/* <Text style={styles.time}>{getFormattedDate(item.time)}</Text> */}
          </View>
        );
      }}
      style={styles.mainStyle}
      ItemSeparatorComponent={() => seperator()}
    />
  );
};

export default CommentsList;
