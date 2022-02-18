import { TouchableOpacity, View, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styles from "./style"
import getNameFromRoute from "../utils/getNameFromRoute"

const HeaderBar = ({ navigation, title }) => {
  return (
    <View style={styles.headerContainer}>
      {
        title !== "Home" ? (
          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => navigation.goBack()}
            style={styles.headerBackicon}
          >
            <Ionicons name="arrow-back-outline" size={25} />
          </TouchableOpacity>
        ):null
      }

      <Text style={styles.headerTitle}>{ getNameFromRoute(title) }</Text>
    </View>
  )
}

export default HeaderBar