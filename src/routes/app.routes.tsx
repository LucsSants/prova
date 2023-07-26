import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../screens/Home";
import { New } from "../screens/New";
import { Profile } from "../screens/Profile";



const {Navigator,Screen} = createNativeStackNavigator();
export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown:false}}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={New}/>
      <Screen name="profile" component={Profile}/>
    </Navigator>
  )
}