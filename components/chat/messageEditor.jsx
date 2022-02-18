import { View, Text, TextInput } from 'react-native'
import styles from '../../screens/messages/style'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

const MessageEditor = () => {
  const [message, setMessage] = useState("")

  const ChangeIcon = () => {
    if (message.length > 0) {
      return "send"
    }

    return "mic-sharp"
  }

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

      <Ionicons style={styles.messageEditorIconFirst} name={ChangeIcon()} size={25} color="#fff" />
      <Ionicons style={styles.messageEditorIconSecond} name="attach-outline" size={25} color="#fff" />
    </View>
  )
}

export default MessageEditor