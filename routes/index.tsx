import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import TabRoutes from "./tab.routes";
import CreateItem from "../screens/CreateItemScreen";


export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="tabRoutes" 
        component={TabRoutes}
      />
      <Stack.Screen 
        name="CreateItem" 
        component={CreateItem}
      />
    </Stack.Navigator>
  );
}