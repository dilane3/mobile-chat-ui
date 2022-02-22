import { useEffect, useState } from 'react'
import Slider from "@react-native-community/slider"
import { View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../screens/messages/style'
import { Audio } from 'expo-av'

const VoiceMessage = ({ data }) => {
  const {
    image,
    date,
    audio
  } = data

  // Setting of local storage
  const [currentPosition, setCurrentPosition] = useState(0)
  const [sound, setSound] = useState(null)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ended, setEnded] = useState(true)

  // UseEffect section

  // Load the sound
  useEffect(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: audio
        }
      );

      console.log(sound)
  
      setSound(sound);
    } catch (err) {
      console.log(err)
    }

    return (
      sound ? () => {
        sound.unloadAsync(); // Unloading sound
      }: undefined
    )
  }, [audio])

  // Get duration
  useEffect(async () => {
    if (sound) {
      try {
        const result = await sound.getStatusAsync()

        setDuration(Math.floor(result.durationMillis / 1000))
        console.log(result)
      } catch (err) {
        console.error(err);
      }
    }
  }, [sound])

  // Handle the progress of the sound
  useEffect(() => {
    let timer = null

    if (isPlaying) {
      if (currentPosition*duration >= duration) {
        setIsPlaying(false)
        setCurrentPosition(0)
        setEnded(true)
      }

      timer = setInterval(() => {
        setCurrentPosition(state => (state) + 1/duration)
      }, 1000)
    } else {
      if (currentPosition === 0) {
        setEnded(true)
      }
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentPosition])

  useEffect(async () => {
    if (sound && ended) {
      await setSoundPosition(0)
    }
  }, [ended])

  useEffect(async () => {
    if (sound) {
      if (!isPlaying) {
        await sound.pauseAsync();
      }
    }
  }, [isPlaying])

  // Play and Stop the sound
  const playSound = async () => {
    if (!isPlaying) {
      try {
        const status = await sound.playAsync();

        setIsPlaying(true)
        setEnded(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const status = await sound.pauseAsync();
        
        setIsPlaying(false)
      } catch (err) {
        console.log(err)
      }
    }
  }

  // Set the position of the sound
  const setSoundPosition = async (newPosition) => {
    try {
      await sound.setPositionAsync(newPosition * duration * 1000)

      if (newPosition > 0) {
        setEnded(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Format duration
  const formatDuration = () => {
    let firstTime = ended ? duration:duration * currentPosition

    let time = Math.floor(firstTime)
    let minutes = 0
    let seconds = 0

    while (time >= 60) {
      minutes += 1
      time -= 60
    }

    seconds = time

    return `${minutes > 9 ? minutes:"0"+minutes}:${seconds > 9 ? seconds:"0"+seconds}`
  }

  return (
    <View style={styles.messageContainerSended}>
      <Image style={styles.messageImage} source={image} />
    
      <View style={styles.audioContainer}>
        <Ionicons 
          onPress={async () => await playSound()} 
          name={isPlaying ? "pause":"play"} 
          color="#fff" 
          size={25} 
        />

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
            setSoundPosition(value)
          }}
        />

        <Text style={styles.audioDuration}>{ formatDuration() }</Text>

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