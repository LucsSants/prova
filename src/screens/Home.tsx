import React, { useEffect, useState} from 'react';
import { Center, HStack, Icon, IconButton,ScrollView, Text, VStack, useTheme, useToast, FlatList} from 'native-base';
import { Button } from '../Components/Button';
import { ChatTeardropText, PlusCircle, UserCircle} from 'phosphor-react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Loading } from '../Components/Loading';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../Components/Product';


export function Home() {
  const {colors} = useTheme()
  const toast = useToast()
  const navigation = useNavigation()

  const currentUser = auth().currentUser?.uid
  const [userProfile, setUserProfile] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const subscriber = firestore()
    .collection('userData')
    .where('userId', '==', currentUser)
    .onSnapshot(snapshot => {
      console.log(snapshot.docs) 
      const data = snapshot.docs.map(doc => {
        const {perfil} = doc.data()

        return {
          perfil
        }
      });
     setUserProfile(data[0].perfil)
      
      setIsLoading(false)
    })
    firestore()
    .collection('Produto')
    .onSnapshot(snapshot => {
      console.log(snapshot.docs)
      const data = snapshot.docs.map(doc => {
        const {Categoria, Nome, Preco, Unidade} = doc.data()

        return {
          id: doc.id,
          Categoria,
          Nome,
          Preco,
          Unidade
        }
      });
     setProducts(data)
      setIsLoading(false)
    })

    return subscriber;

  },[] )

  async function handleNewProduct() {
    navigation.navigate('new')
  }

  async function handleProfile() {
    navigation.navigate('profile')
  }


  


    return (
    <VStack flex={1}>
      <VStack w={'full'} alignItems="center" justifyContent="space-between" flexDirection="row" h={120} background='white' px={5} pt={5}>
        <HStack width="36px"/>
        <HStack alignItems="center" justifyContent="center">
          <Text fontWeight="semibold" fontSize={29} mt={5}>Produtos</Text>
        </HStack>
          <IconButton
            icon={<Icon as={<UserCircle size={36} weight='fill' color={colors.green[700]}/>}/>}
            _pressed={{
              color: "green.400", 
              bg:"gray.100",
            }}
            rounded="full"
            mt={5}
            onPress={handleProfile}
          />
      </VStack> 

      { isLoading ? <Loading/> :
        <FlatList
          data={products}
          p={4}
          keyExtractor={(item:any) => item.id}
          renderItem={ ({item}) : any => <Product data={item}/>} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom : 50
          }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                 Sem Produtos
                </Text>
            </Center>
          )}
        />}


      
     
    {userProfile == "Vendedor" ?
    <HStack h={20} alignItems="center" justifyContent="center" px="4" py="5">
      <Button title='Novo Produto' w="full" rounded="full" onPress={handleNewProduct} leftIcon={<Icon as={<PlusCircle color="white"/>}/>} />
    </HStack>
    : ''  
     
  }
    </VStack>
  );
}