import { Text, View } from "react-native"
import TabIcon from "./tabIcon"
import styles from "./style"

const TabBar = ({ descriptors, navigation, state }) => {
  return (
    <View style={styles.container}>
      {
        state.routes.map((route, index) => {
          const isFocused = state.index === index

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          }

          return (
            <TabIcon 
              key={route.key} 
              fieldname={route.name} 
              active={isFocused}
              onPress={handlePress}
            />
          )
        })
      }
    </View>
  )
}

export default TabBar