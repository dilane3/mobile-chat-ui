import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderBar from "../components/navigations/headerbar";
import ChatScreen from "../screens/chat/chat";
import MessageScreen from "../screens/messages/messageScreen";

const Stack = createNativeStackNavigator()

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ChatHome">
      <Stack.Screen 
        name="ChatHome"
        component={ChatScreen}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={route.name} navigation={navigation} />
        })}
      />
      <Stack.Screen 
        name="Messages"
        component={MessageScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export {
  ChatStackNavigator
}