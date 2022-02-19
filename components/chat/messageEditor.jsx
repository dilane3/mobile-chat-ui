import { View, Text, TextInput } from 'react-native'
import styles from '../../screens/messages/style'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import imageContext from '../../data-manager/context/imageContext'

const MessageEditor = () => {
  // Set local state
  const [message, setMessage] = useState("")

  // Get data from global state
  const { changeImage } = useContext(imageContext)

  const ChangeIcon = () => {
    if (message.length > 0) {
      return "send"
    }

    return "mic-sharp"
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
      changeImage(result.uri);
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
      />

      <Ionicons
        style={styles.messageEditorIconFirst} 
        name={ChangeIcon()} 
        size={25} 
        color="#fff" 
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