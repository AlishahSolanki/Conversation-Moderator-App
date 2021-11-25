import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LoginContext } from '../../contexts';

const Login = (props) => {

  const { } = props
  const { setLogin } = useContext(LoginContext);

  global.log('LOGIN')
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => setLogin()}

      />
    </View>
  )

}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});