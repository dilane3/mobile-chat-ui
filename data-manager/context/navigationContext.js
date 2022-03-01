import { createContext } from "react"

const navigationContext = createContext({
  activeScreen: "",
  modalVisible: false,
  changeActiveScreen: (screenname) => {},
  changeModalVisible: (value) => {}
})

export default navigationContext