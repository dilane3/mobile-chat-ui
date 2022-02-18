import { TouchableOpacity, View, Text, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styles from "../../screens/messages/style"

const ConversationHeader = ({ navigation }) => {
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
          <Text 
            style={styles.contactName} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >Corine Tomeyum</Text>
          <Text style={styles.conversationStatus}>Online</Text>
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