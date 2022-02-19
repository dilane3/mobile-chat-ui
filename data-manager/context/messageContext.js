import { createContext } from "react"

const messageContext = createContext({
  messages: [],
  addMessage: (value, image) => {}
})

export default messageContext