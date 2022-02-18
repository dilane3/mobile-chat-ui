import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff"
  },
  // Search section
  searchBar: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 10,
    paddingLeft: 40,
    paddingTop: 3,
    color: "#828282",
    fontFamily: "Poppins-Regular"
  },
  searchIcon: {
    position: "absolute",
    top: 20,
    left: 30,
    color: "#828282"
  },
  // Active contact section
  activeContact: {
    width: "100%",
    paddingHorizontal: 20
  },
  activeContactText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },
  activeContactList: {
    paddingVertical: 5,
  },
  activeContactItem: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#7400db",
    borderWidth: 1,
    marginRight: 10,
  },
  // Messages section
  messages: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  messagesText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 5
  },
  messagesList: {
    width: "100%",
  },
  contact: {  
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  contactInfo: {
    marginLeft: 10,
    width: Dimensions.get("screen").width - 100
  },
  contactInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contactDate: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#555"
  },
  contactName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium"
  },
  contactMessage: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#555"
  }
})

export default styles