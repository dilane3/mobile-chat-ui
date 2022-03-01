import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useWindowDimensions
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView
} from 'react-native-gesture-handler'
import { useContext, useEffect, useRef } from 'react'
import navigationContext from '../../data-manager/context/navigationContext'

const BottomHalfModal = () => {
  const { modalVisible, changeModalVisible } = useContext(navigationContext)
  const dimensions = useWindowDimensions()

  const HEIGHT = dimensions.height
  const MIDDLE = HEIGHT / 2

  const top = useSharedValue(HEIGHT)

  useEffect(() => {
    if (modalVisible) {
      top.value = MIDDLE
    }
  }, [modalVisible])

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(
        interpolate(top.value, 
          [0, HEIGHT],
          [-20, HEIGHT],
          "clamp"
        )
      ),
      opacity: withSpring(
        interpolate(top.value, 
          [MIDDLE, HEIGHT],
          [1, .6],
          "clamp"
        )
      )
    }
  })

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(
        interpolate(top.value, 
          [MIDDLE, HEIGHT - 120],
          [.6, 0],
          "clamp"
        )
      ),
      transform: [
        {
          translateY: interpolate(top.value, 
            [MIDDLE, HEIGHT],
            [1, 0]
          ) > 0 ? 0 : dimensions.height,
        }
      ]
    }
  })

  const changeModalVisibleWrapper = (arg) => {
    changeModalVisible(arg)
  }

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startTop = top.value
    },
    onActive: (event, context) => {
      top.value = context.startTop + event.translationY
    },
    onEnd: () => {
      if (top.value > MIDDLE + 100) {
        top.value = HEIGHT

        runOnJS(changeModalVisibleWrapper)(false)
      } else if (top.value < MIDDLE - 100) {
        console.log("La")
        top.value = 0
      } else {
        top.value = MIDDLE
      }
    }
  })

  return (
    <>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[
            styles.sheet,
            style
          ]}
        >
          <View style={styles.sheetIndicator} />

          <ScrollView
            style={styles.modalContainer}
          >
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
  
      <Animated.View 
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black"
          },
          backgroundStyle
        ]}
      />
    </>
  )
}

export default BottomHalfModal

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    zIndex: 50,
    paddingHorizontal: 20,
  },
  sheetIndicator: {
    position: "absolute",
    top: 10,
    left: Dimensions.get("window").width / 2 - 40,
    width: 80,
    height: 10,
    borderRadius: 30,
    backgroundColor: "#cacaca"
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    marginTop: 60
  }
})