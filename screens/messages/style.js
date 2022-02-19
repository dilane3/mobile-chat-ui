import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainerReceived: {
    width: Dimensions.get("screen").width,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 25,
    paddingTop: 10
  },
  messageContainerSended: {
    width: Dimensions.get("screen").width,
    paddingHorizontal: 20,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginBottom: 25,
    paddingTop: 10
  },
  messageImage: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  messageCard: {
    position: "relative",
    marginLeft: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f6f6f6",
    padding: 10,
    minWidth: 100,
    maxWidth: Dimensions.get("screen").width - 80
  },
  messageCardSended: {
    marginRight: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#7400db",
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },
  messageImageContent: {
    width: Dimensions.get("screen").width - 100,
    height: 200,
    borderRadius: 10,
    marginTop: 10
  },
  messageTextSended: {
    color: "#fff"
  },  
  messageDate: {
    position: "absolute",
    bottom: -25,
    right: 0,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlignVertical: "bottom",
    color: "#828282"
  },
  messageDateSended: {
    left: 0,
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
    paddingRight: 100 
  },
  messageEditorIconSecond: {
    position: "absolute",
    right: 50,
    bottom: 0,
    height: 50,
    width: 40,
    textAlignVertical: "center",
    textAlign: "center",
    zIndex: 5
  },
  messageEditorIconFirst: {
    position: "absolute",
    right: 10,
    bottom: 0,
    height: 50,
    width: 40,
    textAlignVertical: "center",
    textAlign: "center",
    zIndex: 5
  }
})

export default styles