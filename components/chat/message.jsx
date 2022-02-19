import { Image, View, Text } from "react-native"
import styles from "../../screens/messages/style"

const Message = ({ status, data }) => {
  const {
    image,
    text,
    date,
    images
  } = data

  return (
    <View style={status === "received" ? styles.messageContainerReceived:styles.messageContainerSended}>
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
    </View>
  )
}

export default Message