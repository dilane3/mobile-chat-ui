import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import getIconName from "../utils/getIconName"
import styles from './style'

const TabIcon = ({ fieldname, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={.8}
      style={styles.tabIcon}
    >
      <Ionicons 
        name={ getIconName(fieldname, active) } 
        size={25} 
        color={active ? "#7400db":"#999"}
      />
    </TouchableOpacity>
  )
}

export default TabIcon