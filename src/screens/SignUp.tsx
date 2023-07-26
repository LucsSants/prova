import React, {useState} from 'react';
import {Keyboard} from 'react-native'
import { VStack, Icon, useTheme, Text, Heading, Pressable, useToast, keyboardDismissHandlerManager, ScrollView, Select, CheckIcon } from 'native-base';
import { Input } from '../Components/Input';
import {Envelope, Key, User,Phone, UserList, GenderIntersex, IdentificationCard} from 'phosphor-react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { Button } from '../Components/Button';
import {useNavigation} from '@react-navigation/native'
import { cpfMask } from '../utils/cpfmask';
import { validarCPF } from '../utils/cpfValidation';
import { phoneMask } from '../utils/phoneMask';
import { validarTelefone } from '../utils/phoneValidation';
import { Alert } from 'react-native';



export function SignUp() {
  const {colors} = useTheme()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name ,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [cpf,setCpf] = useState('')
  const [sex,setSex] = useState('')
  const [profile,setProfile] = useState('')


  const navigation = useNavigation()

  function handleGoToSignIn() {
    navigation.navigate('signin')
  }

  function handleSignIn() {
    setIsLoading(true)
    Keyboard.dismiss()
    if (!email.trim() || !password.trim() || !name.trim() || !phone.trim() || !cpf.trim() || !sex.trim() || !profile.trim()) {
      setIsLoading(false)
      return Alert.alert('Preencha todos os campos!')
    }
    if (!cpf) {
      setIsLoading(false)
      return Alert.alert('Cpf inválido')
    }
    if (!phone) {
      setIsLoading(false)
      return Alert.alert('Telefone inválido')
    }
    auth().createUserWithEmailAndPassword(email, password)
    .then(result =>{ 
      console.log(result.user.uid)

      firestore()
      .collection('userData')
      .add({
          userId: result.user.uid,
          sexo: sex,
          nome: name,
          cpf: cpf,
          celular: phone,
          perfil: profile,
          
        })
        .then(()=> {
          console.log("user data cadastro")
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error.code)
          
          setIsLoading(false)
        })
    
    })
    .catch(error=> {
      console.log(error)
      setEmail('')
      if (error.code === "auth/email-already-in-use") {
        setIsLoading(false)
        return Alert.alert("Email já cadastrado!")
      }
    })
    setIsLoading(false)
  }
 

  return (
    <VStack flex={1}  bg="gray.200" px={8} pt={24} alignItems="center">
      <VStack ml="5" mb="1">
      </VStack>
        <Text fontSize={35} fontWeight="bold" >Prova Final</Text>
        <Heading color="gray.400" fontSize="lg" mt={1} mb={6}>
          Cadastre-se
        </Heading>
      
      <ScrollView
        showsVerticalScrollIndicator={false} 
        width="full"
       mb={5}
      >

      <Input
        placeholder='Nome'
        mb={4}
        InputLeftElement={<Icon as={<User color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={setName}
      />

      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={setEmail}
      />
      <Input
        placeholder='Senha'
        mb={4}
        type="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={setPassword}
      />
      <Input
        placeholder='Celular'
        mb={4}
        value={phone}
        maxLength={15}
        keyboardType='phone-pad'
        InputLeftElement={<Icon as={<Phone color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={v=> setPhone(phoneMask(v))}
      />
      <Input
        placeholder='CPF'
        mb={4}
        maxLength={14}
        value={cpf}
        keyboardType='numeric'
        InputLeftElement={<Icon as={<IdentificationCard color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={v => setCpf(cpfMask(v))}
      />

       <Select bg="white" h={14} fontSize={"md"} selectedValue={sex} accessibilityLabel="Sexo" placeholder="Sexo" _selectedItem={{
        bg: "green.100",
        endIcon: <CheckIcon size="5"/>,
      }} mb={2} borderRadius={2} onValueChange={itemValue => setSex(itemValue)}>
          <Select.Item label="Masculino" value="Masculino" />
          <Select.Item label="Feminino" value="Feminino" />
          <Select.Item label="Outro" value="Outro" />
        </Select>

      <Select 
      bg="white" 
      h={14}   
      fontSize={"md"} 
      selectedValue={profile} 
      minWidth="200" 
      accessibilityLabel="Perfil" 
      placeholder="Perfil" 
      _selectedItem={{
        bg: "green.100",
        endIcon: <CheckIcon size="5"/>,
      }} 
      mt={1} 
      onValueChange={itemValue => setProfile(itemValue)}
      >
          <Select.Item label="Vendendor" value="Vendendor" />
          <Select.Item label="Comprador" value="Comprador" />
        </Select>
      </ScrollView>

      
      <Button
        title="Cadastrar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
      />
     
      <VStack flexDirection="row" mt="4" mb="4">
        <Text fontSize="md">Já possui uma conta?</Text>
        <Pressable onPress={handleGoToSignIn}>
          <Text fontWeight="bold"color="green.800" fontSize="md" > Fazer Login</Text>
        </Pressable>
      </VStack >
      
    </VStack>
  );
}