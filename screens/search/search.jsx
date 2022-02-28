import { useEffect, useState } from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  useWindowDimensions,
  Dimensions
} from "react-native"
import { 
  GestureHandlerRootView, 
  PanGestureHandler 
} from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  runOnJS
} from "react-native-reanimated"

const SearchScreen = () => {
  const dimensions = useWindowDimensions()

  const MIDDLE = dimensions.height / 2 - 140
  const HEIGHT = dimensions.height

  console.log({MIDDLE, HEIGHT})

  const top = useSharedValue(HEIGHT)
  const [visible, setVisible] = useState(false)

  const style = useAnimatedStyle(() => {
    return {
      top: interpolate(top.value, 
        [MIDDLE, HEIGHT],
        [MIDDLE, HEIGHT],
        "clamp"
      ),
      opacity: interpolate(top.value, 
        [MIDDLE, HEIGHT],
        [1, .6],
        "clamp"
      ),
    }
  })

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(top.value, 
        [MIDDLE, HEIGHT],
        [.6, 0],
        "clamp"
      ),
      transform: [
        {translateX: interpolate(top.value, 
            [MIDDLE, HEIGHT],
            [1, 0]
          ) > 0 ? 0 : -dimensions.width}
      ]
    }
  })

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startTop = top.value
    },
    onActive: (event, context) => {
      top.value = context.startTop + event.translationY
    },
    onEnd: () => {
      'Worklet';

      if (top.value > MIDDLE + 100) {
        top.value = withTiming(HEIGHT, { duration: 300 })
      } else {
        top.value = withTiming(MIDDLE, { duration: 300 })
      }
    },
  })

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={.8}
          onPress={() => {
            top.value = withTiming(MIDDLE, {duration: 500})
            setVisible(true)
          }}
        >
          <Text style={styles.btnText}>Open Sheet</Text>
        </TouchableOpacity>

        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            style={[
              styles.sheet,
              style
            ]}
          >
            <View style={styles.sheetIndicator} />

            <TouchableOpacity
              style={styles.btn}
              activeOpacity={.8}
              onPress={() => {
                top.value = withTiming(MIDDLE, {duration: 500})
                setVisible(true)
              }}
            >
              <Text style={styles.btnText}>Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              activeOpacity={.8}
              onPress={() => {
                top.value = withTiming(MIDDLE, {duration: 500})
                setVisible(true)
              }}
            >
              <Text style={styles.btnText}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              activeOpacity={.8}
              onPress={() => {
                top.value = withTiming(MIDDLE, {duration: 500})
                setVisible(true)
              }}
            >
              <Text style={styles.btnText}>Setting</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>

        <Animated.View 
          style={[
            backgroundStyle,
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black"
            }            
          ]}
        />
      </View>
    </GestureHandlerRootView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  btn: {
    width: "auto",
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "#3e4bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center" 
  },
  btnText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 16
  },
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
    zIndex: 5,
    padding: 20,
  },
  sheetIndicator: {
    position: "absolute",
    top: 10,
    left: Dimensions.get("window").width / 2 - 40,
    width: 80,
    height: 10,
    borderRadius: 30,
    backgroundColor: "#cacaca"
  }
})