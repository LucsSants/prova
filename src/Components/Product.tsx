import React from 'react';
import { VStack,Text } from 'native-base';

export function Product({data} :any) {
  return (
    <VStack w="full" bg="gray.300" rounded="lg" h="32" justifyContent="space-between" mb="3" p={3}>
      <VStack w="50%">
        <Text fontWeight="bold" fontSize="md">
        {data.Nome}
        </Text>
        <Text alignSelf="flex-start">
          Categoria: {data.Categoria} 
        </Text>
        <Text alignSelf="flex-start">
          Quantidade: {data.Unidade} 
        </Text>
      </VStack>

    
        <Text color="green.700" fontWeight="bold" fontSize="md">
          {data.Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </Text>
  

    </VStack>
  );
}