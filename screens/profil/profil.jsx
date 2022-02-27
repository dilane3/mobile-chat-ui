import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler
} from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
  useAnimatedGestureHandler,
  Easing
} from 'react-native-reanimated'

const ProfilScreen = () => {
  const offset = useSharedValue(0)
  const rotation = useSharedValue(0)
  const pressed = useSharedValue(false)
  const moveX = useSharedValue(0)
  const moveY = useSharedValue(0)
  const [left, setLeft] = useState(true)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 10,
            stiffness: 100
          }, (value) => {
            console.log(value)
          })
        }
      ]
    }
  })

  const otherStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: `${rotation.value}deg`}
      ]
    }
  })

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;

      ctx.x = moveX.value
      ctx.y = moveY.value
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      moveX.value = withSpring(0)
      moveY.value = withSpring(0)
    },
    onActive: (event, ctx) => {
      console.log("Active")
      moveX.value = ctx.x + event.translationX 
      moveY.value = ctx.y + event.translationY 
    }
  });

  const viewStyle = useAnimatedStyle(() => {
    return {   
      transform: [
        { scale: withSpring(pressed.value ? 1.2 : 1) },
        { translateX: moveX.value },
        { translateY: moveY.value }
      ]};
  })
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View 
            style={[
              {
                width: 100,
                height: 100,
                marginBottom: 20
              },
              viewStyle
            ]} 
          >
            {/* <Image 
              source={require("../../assets/images/montagne2.jpg")}
              style={{
                width: "100%",
                height: "100%"
              }}
            /> */}
          </Animated.View>
        </PanGestureHandler>

        <Button 
          onPress={() => {
            rotation.value = withRepeat(withTiming(180, {duration: 1000}), 6, true)
          }}
          title="Move"
        />
      </View>
    </GestureHandlerRootView>
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