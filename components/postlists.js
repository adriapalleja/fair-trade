import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

export default class PostLists extends React.Component {
  static navigationOptions = {
    title: 'Active Posts',
  };

  render() {
    return (
      <View style={styles.container}>
      <Text>Second</Text>
      <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});