import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import ConversationHeader from "../../components/chat/conversationHeader"
import MessageEditor from "../../components/chat/messageEditor"
import styles from "./style"

const MessageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ConversationHeader navigation={navigation} />

      <View style={styles.conversationContent}></View>

      {/* <MessageEditor /> */}
      <StatusBar style="black" />
    </View>
  )
}

export default MessageScreen