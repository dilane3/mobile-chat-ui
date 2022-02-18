import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/tabNavigator';
import { useFonts } from 'expo-font'
import navigationContext from './data-manager/context/navigationContext';
import { useState } from 'react';

export default function App() {
  const [fontLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf")
  })

  const [activeScreen, setActiveScreen] = useState(null)

  const navigationContextValue = {
    activeScreen,
    changeActiveScreen: (screenname) => setActiveScreen(screenname)
  }

  return (
    <navigationContext.Provider value={navigationContextValue}>
      <NavigationContainer>

        {
          fontLoaded ? <TabNavigator />:null
        }

        <StatusBar style='auto' />
      </NavigationContainer>
    </navigationContext.Provider>
  );
}
