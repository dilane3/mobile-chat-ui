import { createContext } from "react"

const messageContext = createContext({
  messages: [],
  addMessage: (value, image) => {},
  addVoiceMessage: (audio) => {}
})

export default messageContext