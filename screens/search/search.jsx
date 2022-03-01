import { useContext } from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  useWindowDimensions,
  Dimensions
} from "react-native"
import navigationContext from "../../data-manager/context/navigationContext"

const SearchScreen = () => {
  const dimensions = useWindowDimensions()

  const MIDDLE = dimensions.height / 2 - 140

  const { modalVisible, changeModalVisible } = useContext(navigationContext)

  console.log(modalVisible)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={.8}
        onPress={() => {
          changeModalVisible(true)
        }}
      >
        <Text style={styles.btnText}>Open Sheet</Text>
      </TouchableOpacity>
    </View>
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
  }
})