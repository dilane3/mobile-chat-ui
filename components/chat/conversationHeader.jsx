import { TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styles from "../../screens/messages/style"

const ConversationHeader = () => {
  return (
    <View style={styles.conversationHeader}>
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => navigation.goBack()}
        style={styles.headerBackicon}
      >
        <Ionicons name="arrow-back-outline" size={25} />
      </TouchableOpacity>

      <View style={styles.conversationInfo}>
        <Image style={styles.conversationImage} source={require("../../assets/images/femme2.jpg")} />
      
        <View style={styles.conversationInfoTop}>
          <Text style={styles.contactName}>Corine</Text>
          <Text style={styles.conversationStatus}>Online</Text>
        </View>
      </View>

      <View style={conversationOptions}>
        <Ionicons name="telephone" size={25} />
        <Ionicons name="camera" size={25} />
      </View>
    </View>
  )
}

export default ConversationHeader