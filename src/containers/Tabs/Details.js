import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { navigate } from '../../services/NavigationService';

export default class Details extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {

    const { } = this.props

    return (
      <View style={styles.container}>
        <Button title="Example" onPress={() => navigate('Example')} />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});