import { StatusBar } from "expo-status-bar"
import { useContext, useState } from "react"
import { FlatList, Image, View } from "react-native"
import ConversationHeader from "../../components/chat/conversationHeader"
import Message from "../../components/chat/message"
import VoiceMessage from "../../components/chat/voiceMessage"
import messageContext from "../../data-manager/context/messageContext"
import styles from "./style"

const Messages = {
  contact: {
    name: "Corine",
    status: "Online",
    image: require("../../assets/images/femme2.jpg")
  },
  messages: [
    {
      id: 1,
      image: require("../../assets/images/femme2.jpg"),
      text: "Hello Dilane, how are you ?",
      date: "09:40",
      status: "received",
      images: [
        require("../../assets/images/oeuf.jpg")
      ]
    },
    {
      id: 2,
      image: require("../../assets/images/montagne2.jpg"),
      text: "I'm good, thank. What about you ?",
      date: "09:42",
      status: "sended"
    },
    {
      id: 3,
      image: require("../../assets/images/femme2.jpg"),
      text: "I'm fine too ?",
      date: "09:45",
      status: "received"
    },
    {
      id: 4,
      image: require("../../assets/images/femme2.jpg"),
      text: "Please, I need your help. i want to create a static website, using html and css only. What should I process ?",
      date: "09:48",
      status: "received"
    },
    {
      id: 5,
      image: require("../../assets/images/montagne2.jpg"),
      text: "So great !! Creating website is so amazing.",
      date: "09:50",
      status: "sended"
    },
    {
      id: 6,
      image: require("../../assets/images/montagne2.jpg"),
      text: "You have to learn about Html and css first, then starting writing you code. You need a Text editor like VScode, and a browser like Firefox",
      date: "09:55",
      status: "sended"
    },
    {
      id: 7,
      image: require("../../assets/images/montagne2.jpg"),
      text: "That's all",
      date: "09:57",
      status: "sended"
    },
    {
      id: 8,
      image: require("../../assets/images/femme2.jpg"),
      text: "Okay cc, thank. Have a nice day",
      date: "10:16",
      status: "received"
    },
  ]
}

const voiceMessage = {
  image: require("../../assets/images/femme2.jpg"),
  date: "10:23",
  audio: "audio.mp3"
}

const MessageScreen = ({ navigation }) => {
  const { messages } = useContext(messageContext)
  
  return (
    <View style={styles.container}>
      <ConversationHeader navigation={navigation} data={Messages.contact} />

      <View style={{...styles.conversationContent}}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            let component = null

            if (item.type === "text") {
              component = <Message status={item.status} data={item} />
            } else {
              component = <VoiceMessage data={item} />
            }

            return component
          }}
        />
      </View>
      
      <StatusBar style="black" />
    </View>
  )
}

export default MessageScreen