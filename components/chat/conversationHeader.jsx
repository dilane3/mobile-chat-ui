import { TouchableOpacity, View, Text, Image, BackHandler } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styles from "../../screens/messages/style"
import { useContext, useEffect } from "react"
import navigationContext from "../../data-manager/context/navigationContext"
import imageContext from "../../data-manager/context/imageContext"

const ConversationHeader = ({ navigation, data }) => {
  // Get data from global state
  const { changeActiveScreen } = useContext(navigationContext)
  const { image: globalImage } = useContext(imageContext)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      changeActiveScreen(null)
    })

    return () => backHandler.remove();
  }, [])

  // Some functions
  const handlePressGoBack = () => {
    changeActiveScreen(null)

    navigation.goBack()
  }

  const {
    name,
    status,
    image
  } = data

  return (
    <View style={styles.conversationHeader}>
      <TouchableOpacity
        activeOpacity={.8}
        onPress={handlePressGoBack}
        style={styles.headerBackicon}
      >
        <Ionicons name="arrow-back-outline" size={25} />
      </TouchableOpacity>

      <View style={styles.conversationInfo}>
        <Image style={styles.conversationImage} source={globalImage ? {uri: globalImage}:image} />
      
        <View style={styles.conversationInfoTop}>
          <Text 
            style={styles.contactName} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >{ name }</Text>
          <Text style={styles.conversationStatus}>{ status }</Text>
        </View>
      </View>

      <View style={styles.conversationOptions}>
        <Ionicons name="call" size={20} color="#7400db" />
        <Ionicons name="videocam" size={20} color="#7400db" />
      </View>
    </View>
  )
}

export default ConversationHeader