import { createContext } from 'react'

const imageContext = createContext({
  image: null,
  changeImage: (image) => {}
})

export default imageContext