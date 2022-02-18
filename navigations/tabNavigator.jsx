import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home/home'
import SearchScreen from '../screens/search/search'
import ProfilScreen from '../screens/profil/profil'
import TabBar from '../components/navigations/tabBar'
import HeaderBar from '../components/navigations/headerbar'
import { ChatStackNavigator } from './stackNavigator'
import MessageEditor from '../components/chat/messageEditor'
import { useContext } from 'react'
import navigationContext from '../data-manager/context/navigationContext'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { activeScreen } = useContext(navigationContext)

  return (
    <Tab.Navigator
      initialRouteName="Chat" 
      backBehavior="history"
      tabBar={props => activeScreen ? <MessageEditor /> : <TabBar {...props} />}
    >
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={route.name} navigation={navigation} />
        })}
      />
      <Tab.Screen 
        name="Search"
        component={SearchScreen}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={route.name} navigation={navigation} />
        })}
      />
      <Tab.Screen 
        name="Chat"
        component={ChatStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Profil"
        component={ProfilScreen}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={route.name} navigation={navigation} />
        })}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator