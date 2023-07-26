import React, { useState } from 'react';
import { VStack, Text, Center, Pressable, FlatList, useToast, ScrollView, HStack} from 'native-base';
import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Keyboard } from 'react-native';
import { Button } from '../Components/Button';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';



export function New() {
  const [isLoading, setIsLoading] = useState(false)

  const [productName, setProductName] = useState('') 
  const [category, setCategory] = useState('')
  const [price,setPrice] = useState('') 
  const [amount,setAmount] = useState('') 


  const toast = useToast()
  const navigation = useNavigation()

  
  function handleAddTags() {
    Keyboard.dismiss()
  }

  async function handleCreateProduct() {
    if (!productName.trim() || !category.trim() || !price.trim() || !amount.trim) {
      return Alert.alert("Preencha todos os campos")
    }
    setIsLoading(true)
    firestore()
      .collection('Produto')
      .add({
          Categoria: category,
          Nome: productName,
          Preco: Number(price),
          Unidade: Number(amount)
        })
        .then(()=> {
          console.log("user data cadastro")
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error.code)
          
          setIsLoading(false)
        })
    setIsLoading(false)
    navigation.goBack()
  }
  
  return (
    <VStack flex={1} flexDir={'column'} justifyContent={'space-between'}>
      <VStack p={5}>
      <Header title='Novo Produto' />
      <VStack space={3}>
        <Input placeholder='Nome' onChangeText={setProductName} />
        <Input  placeholder='Categoria' onChangeText={setCategory}/>
        <Input  placeholder='Preço' onChangeText={setPrice} keyboardType='numeric'/>
        <Input  placeholder='Unidades Disponíveis' onChangeText={setAmount} keyboardType='numeric'/>
      
      </VStack>
      

  </VStack>

      <HStack alignItems="center" justifyContent="center" p={5}>
      <Button title="Adicionar Produto" w="full" onPress={handleCreateProduct} isLoading={isLoading}/>
      </HStack>

      

    </VStack>
  );
}