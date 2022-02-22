import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/tabNavigator';
import { useFonts } from 'expo-font'
import navigationContext from './data-manager/context/navigationContext';
import imageContext from './data-manager/context/imageContext';
import messageContext from './data-manager/context/messageContext';
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
  const [messages, setMessages] = useState([])

  const handleAddMessage = (value, image) => {
    const id = messages.length === 0 ? 1:messages[messages.length-1].id+1
    const date = new Date()

    const newMessage = {
      id,
      image: require("./assets/images/montagne2.jpg"),
      text: value,
      date: `${date.getHours()}:${date.getMinutes()}`,
      status: "sended",
      images: image ? [image]:null,
      type: "text"
    }

    const messagesClone = [...messages]

    messagesClone.push(newMessage)

    setMessages(messagesClone)
  }

  const handleAddVoiceMessage = (audio) => {
    const id = messages.length === 0 ? 1:messages[messages.length-1].id+1
    const date = new Date()

    const newMessage = {
      id,
      image: require("./assets/images/montagne2.jpg"),
      audio,
      date: `${date.getHours()}:${date.getMinutes()}`,
      status: "sended",
      type: "voice"
    }

    const messagesClone = [...messages]

    messagesClone.push(newMessage)

    setMessages(messagesClone)
  }

  const navigationContextValue = {
    activeScreen,
    changeActiveScreen: (screenname) => setActiveScreen(screenname)
  }

  const imageContextValue = {
    image,
    changeImage: (image) => setImage(image)
  }

  const messageContextValue = {
    messages,
    addMessage: (value, image) => handleAddMessage(value, image),
    addVoiceMessage: (audio) => handleAddVoiceMessage(audio)
  }

  return (
    <navigationContext.Provider value={navigationContextValue}>
      <imageContext.Provider value={imageContextValue}>
        <messageContext.Provider value={messageContextValue}>
          <NavigationContainer>

            {
              fontLoaded ? <TabNavigator />:null
            }

            <StatusBar style='auto' />
          </NavigationContainer>
        </messageContext.Provider>
      </imageContext.Provider>
    </navigationContext.Provider>
  );
}
