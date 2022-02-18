import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  // Conversation Hearder section
  conversationHeader: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  headerBackicon: {
    backgroundColor: "#e6e6e6",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },
  conversationInfo: {
    width: Dimensions.get("screen").width - 130,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  conversationImage: {
    width: 35,
    height: 35,
    borderRadius: 100
  },
  conversationInfoTop: {
    marginLeft: 10,
  },
  contactName: {
    width: Dimensions.get("screen").width - 190,
    fontSize: 14,
    fontFamily: "Poppins-Medium"
  },
  conversationStatus: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#7400db"
  },
  conversationOptions: {
    width: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-end"
  },
  // Conversation content section
  conversationContent: {
    height: Dimensions.get("screen").height - 80
  },
  // Message Editor section
  messageEditor: {
    width: Dimensions.get("screen").width - 40,
    minHeight: 50,
    maxHeight: 100,
    height: "auto",
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  messageInput: {
    width: "100%",
    minHeight: 50,
    maxHeight: 100,
    borderRadius: 20,
    color: "#fff",
    backgroundColor: "#7400db",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingRight: 70 
  },
  messageEditorIconSecond: {
    position: "absolute",
    right: 50,
    bottom: 10
  },
  messageEditorIconFirst: {
    position: "absolute",
    right: 20,
    bottom: 10
  }
})

export default styles