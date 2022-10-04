import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, SafeAreaView } from 'react-native'
import useLoginViewModel from './view.model'

const LoginView: React.FC = () => {
  const { email, password, setEmail, setPassword, isLoading, onSubmit } = useLoginViewModel()
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>E-mail</Text>
        <TextInput
          placeholder='rafael@email.com'
          value={email}
          onChangeText={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          placeholder='******'
          value={password}
          onChangeText={setPassword}
        />
        <Button title='Login' onPress={onSubmit} disabled={isLoading} />
      </View>
    </SafeAreaView>
  )
}

export default LoginView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  }
})