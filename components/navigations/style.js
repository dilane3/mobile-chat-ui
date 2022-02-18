import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tabIcon: {
    height: "100%",
    width: (Dimensions.get("screen").width / 4) - 20,
    justifyContent: "center",
    alignItems: "center"
  },
  // Header section
  headerContainer: {
    position: "relative",
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 21,
    backgroundColor: "#fff",
    elevation: 1
  },
  headerBackicon: {
    position: "absolute",
    top: 32.5,
    left: 20,
    backgroundColor: "#e6e6e6",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  }
})

export default styles