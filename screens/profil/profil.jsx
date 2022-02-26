import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated'

const ProfilScreen = () => {
  const offset = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 250)
        }
      ]
    }
  })
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, style]} />

      <Button 
        onPress={() => {
          offset.value = Math.random()
        }}
        title="Move"
      />
    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#3e4bff",
    marginBottom: 20,
    alignSelf: "flex-start"
  }
})