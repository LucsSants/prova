import React, {useState} from 'react';
import {Keyboard} from 'react-native'
import { VStack, Icon, useTheme, Text, Heading, Pressable, useToast, keyboardDismissHandlerManager } from 'native-base';
import { Input } from '../Components/Input';
import auth from '@react-native-firebase/auth'
import {Envelope, Key} from 'phosphor-react-native'
import {useNavigation} from '@react-navigation/native'



import { Button } from '../Components/Button';


export function SignIn() {
  const {colors} = useTheme()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigation = useNavigation()

  function handleGoToCreateAccount() {
    navigation.navigate('signup')
  }

  function handleSignIn() {
    Keyboard.dismiss()
    if (!email || !password) {
      return toast.show({description: 'Preencha E-mail e Senha'})
    }
    auth().signInWithEmailAndPassword(email, password)
    .then(result => console.log(result))
    .catch(err=> console.log(err))
    

  }
 

  return (
    <VStack flex={1}  bg="gray.200" px={8} pt={24} alignItems="center">
      <VStack ml="5" mb="1">
      </VStack>
        <Text fontSize={35} fontWeight="bold" >Prova Final</Text>
        <Heading color="gray.400" fontSize="lg" mt={1} mb={6}>
          Acesse sua conta
        </Heading>
      
      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={setEmail}
      />
      <Input
        placeholder='Senha'
        mb={4}
        InputLeftElement={<Icon as={<Key color={colors.gray[400]}/>} ml={4}/>}
        type='password'
        onChangeText={setPassword}
      />
      <Button
        title="Entrar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
      />

      <VStack flexDirection="row" mt="4">
        <Text fontSize="md">Não possui uma conta?</Text>
        <Pressable onPress={handleGoToCreateAccount}>
          <Text fontWeight="bold"color="green.800" fontSize="md" > Criar uma conta</Text>
        </Pressable>
      </VStack >
      
      
    </VStack>
  );
}