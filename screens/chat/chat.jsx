import { Text, View, TextInput, Image, ScrollView, FlatList } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styles from "./style"
import Contact from "../../components/chat/contact"

// Data
const Contacts = [
  {
    image: require("../../assets/images/homme2.jpg"),
    name: "Dan",
    date: "10:20",
    message: "Hey guy, please I want to meet you.",
    active: true
  },
  {
    image: require("../../assets/images/femme1.jpg"),
    name: "Nina",
    date: "10:18",
    message: "Ok dilane, I will come.",
    active: true
  },
  {
    image: require("../../assets/images/femme2.jpg"),
    name: "Corine",
    date: "10:16",
    message: "Okay cc, Have a nice day",
    active: true
  },
  {
    image: require("../../assets/images/cannette.jpg"),
    name: "Donald",
    date: "10:15",
    message: "hahaha",
    active: false
  },
  {
    image: require("../../assets/images/montagne1.jpg"),
    name: "Blondelle",
    date: "10:10",
    message: "Please dilane, I want that you send...",
    active: true
  },
  {
    image: require("../../assets/images/montagne2.jpg"),
    name: "Daniel",
    date: "10:06",
    message: "Dilane, Come here please !",
    active: false
  },
  {
    image: require("../../assets/images/oeuf.jpg"),
    name: "Ghislain",
    date: "10:00",
    message: "How man ?",
    active: true
  },
  {
    image: require("../../assets/images/soleil.jpg"),
    name: "Ivan",
    date: "09:40",
    message: "Hey guy, please I want to meet you.",
    active: false
  }
]

const ChatScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search Anything" 
          selectionColor="#7400db"  
        />
        <Ionicons style={styles.searchIcon} name="search-outline" size={20} />
      </View>

      <View style={styles.activeContact}>
        <Text style={styles.activeContactText}>Active</Text>

        <ScrollView 
          style={styles.activeContactList} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        >
          {
            Contacts.map((item, index) => {
              if (item.active) {
                return <Image key={index} source={item.image} style={styles.activeContactItem} />
              }
              return null
            })
          }
        </ScrollView>
      </View>

      <View style={styles.messages}>
        <Text style={styles.messagesText}>Messages</Text>

        <View style={styles.messagesList}>
          {
            Contacts.map((item, index) => {
              return <Contact key={index} data={item} navigation={navigation} />
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default ChatScreen