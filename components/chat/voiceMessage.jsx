import { useEffect, useState } from 'react'
import Slider from "@react-native-community/slider"
import { View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../screens/messages/style'

const VoiceMessage = ({ data }) => {
  const {
    image,
    date,
    audio
  } = data

  // Setting of local storage
  const [currentPosition, setCurrentPosition] = useState(0)
  const [sound] = useState(audio)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // UseEffect section

  // Get duration
  useEffect(async () => {
    if (sound) {
      try {
        const result = await sound.getStatusAsync()

        setDuration(Math.floor(result.durationMillis / 1000))
      } catch (err) {
        console.error(err);
      }
    }

    return (
      sound ? () => {
        sound.unloadAsync(); // Unloading sound
      }: undefined
    )
  }, [audio])

  // Start and Stop playing sound
  useEffect(async () => {
    let timer = null

    if (isPlaying) {
      if (currentPosition*duration >= duration) {
        setIsPlaying(false)
        setCurrentPosition(0)
        // setEnded(true)
      }

      timer = setInterval(() => {
        setCurrentPosition(state => (state) + 1/duration)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentPosition])

  return (
    <View style={styles.messageContainerSended}>
      <Image style={styles.messageImage} source={image} />
    
      <View style={styles.audioContainer}>
      <Ionicons name={"play"} color="#fff" size={25} />

        <Slider
          style={styles.audioTracker}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#f6f6f6"
          thumbTintColor="#fff"
          value={currentPosition}
          onValueChange={value => {
            setCurrentPosition(value)
          }}
          onSlidingStart={(value) => {
            // playSound(true)
          }}
          onSlidingComplete={(value) => {
            setCurrentPosition(value)
            playSound(false, true)
          }}
        />

        <Text style={styles.audioDuration}>12:30</Text>

        <Text 
          style={{
            ...styles.messageDate, 
            ...styles.messageDateSended, 
            right: undefined
          }}
        >{ date }</Text>
      </View>
    </View>
  )
}

export default VoiceMessage