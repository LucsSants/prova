
import { StyleSheet, Text, View } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/Styles/theme';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from './src/Components/Loading';
import { SignUp } from './src/screens/SignUp';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    {fontsLoaded ?  <Routes/> : <Loading/>}
    </NativeBaseProvider>
  );
}


