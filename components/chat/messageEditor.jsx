import { View, Text, TextInput } from 'react-native'
import styles from '../../screens/messages/style'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import imageContext from '../../data-manager/context/imageContext'
import messageContext from '../../data-manager/context/messageContext'

const MessageEditor = () => {
  // Set local state
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)

  // Get data from global state
  // const { changeImage } = useContext(imageContext)
  const { addMessage } = useContext(messageContext)

  const ChangeIcon = () => {
    if (message.length > 0) {
      return "send"
    }

    return "mic-sharp"
  }

  const handleSendMessage = () => {
    if (message.length > 0) {
      addMessage(message, image)

      console.log(message)

      setMessage("")
      setImage(null)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.messageEditor}>
      <TextInput 
        multiline
        placeholder='Type a message'
        style={styles.messageInput}
        placeholderTextColor="#fff"
        value={message}
        onChangeText={text => setMessage(text)}
        selectionColor="#fff"
        autoFocus
      />

      <Ionicons
        style={styles.messageEditorIconFirst} 
        name={ChangeIcon()} 
        size={25} 
        color="#fff"
        onPress={handleSendMessage} 
      />
      <Ionicons 
        style={styles.messageEditorIconSecond} 
        name="attach-outline" 
        size={25} 
        color="#fff" 
        onPress={pickImage}  
      />
    </View>
  )
}

export default MessageEditor