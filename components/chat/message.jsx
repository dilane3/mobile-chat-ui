import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, View, Text } from "react-native"
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
    
      <View 
        style={
          status === "received" ? (
            styles.messageCard
          ):({
            ...styles.messageCard,
            ...styles.messageCardSended,
            borderBottomRightRadius: 0
          })
        }
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
      </View>
    </Animated.View>
  )
}

export default Message