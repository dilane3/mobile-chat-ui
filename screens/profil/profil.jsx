import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from "react-native"
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native';

const ProfilScreen = () => {
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ended, setEnded] = useState(true)


  const playSound = async (st = null, pos = null) => {
    const status = st !== null ? st:isPlaying

    console.log({st})

    if (!status) {
      try {
        const status = await sound.playAsync();

        if (pos)
          await sound.setPositionAsync(currentPosition * duration * 1000)

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

  useEffect(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/audios/audio.mp3')
      );

      console.log(sound)
  
      setSound(sound);
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(async () => {
    if (sound) {
      sound.getStatusAsync()
      .then(function(result) {
        setDuration(Math.floor(result.durationMillis / 1000))
      })
      .catch(err => console.log(err));
    }

    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  useEffect(async () => {
    if (isPlaying && ended) {
      await sound.setPositionAsync(0)
    }
  }, [isPlaying, ended])

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
    }

    return () => clearInterval(timer)
  }, [sound, isPlaying, currentPosition])

  const formatDuration = () => {
    let time = Math.floor(duration * currentPosition)
    let minutes = 0
    let seconds = 0

    while (time >= 60) {
      minutes += 1
      time -= 60
    }

    seconds = time

    return `0${minutes}:${seconds > 9 ? seconds:"0"+seconds}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.audioContainer}>
        <Ionicons onPress={() => playSound()} name={isPlaying ? "pause":"play"} color="#7400db" size={25} />

        <Slider
          style={styles.audioTracker}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#7400db"
          maximumTrackTintColor="#222"
          thumbTintColor="#7400db"
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

        <Text style={styles.audioDuration}>{formatDuration()}</Text>
      </View>
    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20
  },
  audioContainer: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  audioTracker: {
    width: Dimensions.get("window").width - 80,
    height: 20
  },
  audioDuration: {
    position: "absolute",
    bottom: 8,
    right: 20,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#555"
  }
})