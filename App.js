import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/tabNavigator';
import { useFonts } from 'expo-font'
import navigationContext from './data-manager/context/navigationContext';
import imageContext from './data-manager/context/imageContext';
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
  const [image, setImage] = useState(null)

  const navigationContextValue = {
    activeScreen,
    changeActiveScreen: (screenname) => setActiveScreen(screenname)
  }

  const imageContextValue = {
    image,
    changeImage: (image) => setImage(image)
  }

  return (
    <navigationContext.Provider value={navigationContextValue}>
      <imageContext.Provider value={imageContextValue}>
        <NavigationContainer>

          {
            fontLoaded ? <TabNavigator />:null
          }

          <StatusBar style='auto' />
        </NavigationContainer>
      </imageContext.Provider>
    </navigationContext.Provider>
  );
}
