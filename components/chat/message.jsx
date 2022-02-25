import { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, View, Text, PanResponder, Easing } from "react-native"
import styles from "../../screens/messages/style"

const Message = ({ status, data }) => {
  const {
    image,
    text,
    date,
    images
  } = data

  const {
    width: windowWidth, 
    height: windowHeight
  } = Dimensions.get("window")

  const pos = useRef(new Animated.ValueXY({x: windowWidth - 20, y: windowHeight - 80})).current
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const allTouches = event.nativeEvent.changedTouches.length
        
        if (allTouches === 1) {
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          })
        }
      },
      onPanResponderRelease: () => {
        const value = pan.x

        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true
        }).start(({ finished }) => {
          if (finished) {
            // console.log(`message d'id: ${data.id}`)
            console.log({value})
          }
        })
      },
      useNativeDriver: true
    })
  ).current

  useEffect(() => {
    Animated.spring(pos, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <Animated.View 
      style={
        status === "received" ? (
          styles.messageContainerReceived
        ):([
          styles.messageContainerSended,
          {
            transform: [
              {
                translateX: pos.x
              },
              {
                translateY: pos.y
              }
            ]
          }
        ])
      }
    >
      <Image style={styles.messageImage} source={image} />
    
      <Animated.View 
        style={[
          status === "received" ? (
            styles.messageCard
          ):({
            ...styles.messageCard,
            ...styles.messageCardSended,
            borderBottomRightRadius: 0
          }),
          {
            transform: [
              {
                translateX: pan.x.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [-100, 0],
                  extrapolate: "clamp"
                })
              }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <Text 
          style={
            status === "sended" ? (
              {
                ...styles.messageTextSended, 
                ...styles.messageText
              }
            ):(
              styles.messageText
            )
          }
        >{ text }</Text>

        {
          images && images.length > 0 && (
            <Image
              style={styles.messageImageContent}
              source={{uri: images[0]}}
            />
          )
        }

        <Text 
          style={
            status === "received" ? (
              styles.messageDate
            ):({
              ...styles.messageDate, 
              ...styles.messageDateSended, 
              right: undefined
            })
          }
        >{ date }</Text>
      </Animated.View>
    </Animated.View>
  )
}

export default Message