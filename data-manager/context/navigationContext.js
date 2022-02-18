import { createContext } from "react"

const navigationContext = createContext({
  activeScreen: "",
  changeActiveScreen: (screenname) => {}
})

export default navigationContext