import { Image, View, Text, TouchableOpacity } from "react-native"
import styles from "../../screens/chat/style"

const Contact = ({ data, navigation }) => {
  const {
    image,
    name,
    date,
    message
  } = data

  const handlePress = () => {
    navigation.navigate("Messages")
  }
  
  return (
    <TouchableOpacity activeOpacity={.8} style={styles.contact} onPress={handlePress}>
      <Image 
        style={styles.contactImage}
        source={image}
      />

      <View style={styles.contactInfo}>
        <View style={styles.contactInfoTop}>
          <Text style={styles.contactName}>{ name }</Text>
          <Text style={styles.contactDate}>{ date }</Text>
        </View>
        <Text style={styles.contactMessage} numberOfLines={1} ellipsizeMode="tail">{ message }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Contact