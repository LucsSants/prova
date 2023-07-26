import React, { useEffect, useState } from 'react';
import { VStack, Text, Center, Pressable, FlatList, useToast, ScrollView, HStack} from 'native-base';
import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Keyboard } from 'react-native';
import { Button } from '../Components/Button';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Loading } from '../Components/Loading';




export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = auth().currentUser?.uid

  const [user, setUser] = useState<any>({})

  useEffect(() => {
    setIsLoading(true)

    const subscriber = firestore()
    .collection('userData')
    .where('userId', '==', currentUser)
    .onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        const {nome,perfil, cpf,sexo, celular} = doc.data()
        return {
          nome,
          perfil,
          cpf,
          sexo,
          celular
        }
      });
     setUser(data[0])
      
      setIsLoading(false)
    })
    setIsLoading(false)
    return subscriber;

  },[] )

  function handleLogout() {
    auth()
    .signOut()
    .catch((error)=> {
      console.log(error)
      Alert.alert('Sair', 'Não foi possível sair.')
    })
  }
 
  
  return (
    <VStack flex={1} flexDir={'column'} justifyContent={'space-between'}>
      <VStack p={5}>
      <Header title='Perfil' />
      {isLoading ? <Loading/> : 
      <VStack space={3}>
        <Text>Nome: {user.nome}</Text>
        <Text>Celular: {user.celular}</Text>
        <Text>CPF: {user.cpf}</Text>
        <Text>Perfil: {user.perfil}</Text>
        <Text>Sexo: {user.sexo}</Text>
      </VStack>
}

  </VStack>

      <HStack alignItems="center" justifyContent="center" p={5}>
      <Button title="Sair" w="full" onPress={handleLogout} isLoading={isLoading}/>
      </HStack>

      

    </VStack>
  );
}