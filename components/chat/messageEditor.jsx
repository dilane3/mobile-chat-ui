import { View, Text, TextInput, Animated, PanResponder } from 'react-native'
import styles from '../../screens/messages/style'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import messageContext from '../../data-manager/context/messageContext'
import { Audio } from 'expo-av'

const MessageEditor = () => {
  // Set local state
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0)

  // Get data from global state
  // const { changeImage } = useContext(imageContext)
  const { addMessage, addVoiceMessage } = useContext(messageContext)

  // UseRef section
  const scale = useRef(new Animated.Value(1)).current
  const scale2 = useRef(new Animated.Value(1)).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderStart: (event) => {
        if (message.length === 0) {
          Animated.sequence([
            Animated.parallel(
              [
                Animated.timing(scale, {
                  toValue: 1.5,
                  duration: 300,
                  useNativeDriver: true
                }),
                Animated.timing(scale2, {
                  toValue: 1.5,
                  duration: 300,
                  useNativeDriver: true
                })
              ]
            ),
            Animated.loop(
              Animated.timing(scale2, {
                toValue: 3,
                duration: 1000,
                useNativeDriver: true
              })
            )
          ]).start(async () => {
            await startRecording()
          })
        }
      },
      onPanResponderRelease: () => {
        Animated.parallel(
          [
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true
            }),
            Animated.spring(scale2, {
              toValue: 1,
              useNativeDriver: true
            })
          ]
        ).start()
      }
    })
  ).current

  // UseEffect section

  useEffect(() => {
    let timer = null

    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(state => state + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRecording])

  const startRecording = async () => {
    // Audio.requestPermissionsAsync()
    // .then(() => {
    //   Audio.setAudioModeAsync({
    //     allowsRecordingIOS: true,
    //     playsInSilentModeIOS: true,
    //   })
    //   .then(() => {
    //     Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
    //     .then(({ recording }) => {
    //       setRecording(recording);
    //       setIsRecording(true)

    //       console.log('Recording started');
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // })
    // .catch(err => {
    //   console.error(err)
    // })



    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true
      }); 
      console.log('Starting recording..');

      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true)

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const stopRecording = async (action) => {
    console.log('Stopping recording..');

    try {
      await recording.stopAndUnloadAsync();
  
      if (action === "send") {
        const uri = recording.getURI();
  
        addVoiceMessage(uri)
      }
  
      setIsRecording(false)
      setRecordingTime(0)
    } catch (err) {
      console.error(err)
    }
  }

  const ChangeIcon = () => {
    if (message.length > 0) {
      return "send"
    }

    return "mic-sharp"
  }

  const handleSendMessage = () => {
    if (message.length > 0) {
      addMessage(message, image)

      console.log(message)

      setMessage("")
      setImage(null)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Format duration
  const formatDuration = () => {
    let time = recordingTime
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
    <View style={styles.messageEditor}>
      {
        !isRecording ? (
          <View style={styles.messageInputContainer}>
            <TextInput 
              multiline
              placeholder='Type a message'
              style={styles.messageInput}
              placeholderTextColor="#fff"
              value={message}
              onChangeText={text => setMessage(text)}
              selectionColor="#fff"
              autoFocus
            />
    
            <Ionicons 
              style={styles.messageEditorIconSecond} 
              name="attach-outline" 
              size={25} 
              color="#fff" 
              onPress={pickImage}  
            />

            <Animated.View
              style={[
                styles.messageEditorIconFirst,
                {
                  transform: [
                    {scale}
                  ],
                  bottom: 5,
                  backgroundColor: "#7400db",
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                }
              ]} 
            />
            <Animated.View
              style={[
                styles.messageEditorIconFirst,
                {
                  transform: [
                    {
                      scale: scale2
                    }
                  ],
                  bottom: 5,
                  backgroundColor: "#7400db",
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                  opacity: scale2.interpolate({
                    inputRange: [1.5, 2],
                    outputRange: [1, 0],
                    extrapolate: "clamp"
                  })
                }
              ]} 
            />
            <Ionicons
              style={styles.messageEditorIconFirst} 
              name={ChangeIcon()} 
              size={25} 
              color="#fff"synthetic event
              onPress={handleSendMessage}
              // {...panResponder.panHandlers} 
            />
          </View>
        ):(
          <View style={styles.messageInputContainer}>
            <Text style={styles.voiceRecorderTimer}>{ formatDuration() }</Text>

            <Ionicons
              style={styles.messageEditorIconSecond} 
              name="close" 
              size={25} 
              color="#fff"synthetic event
              onPress={async () => {await stopRecording("close")}} 
            />
            <Ionicons
              style={styles.messageEditorIconFirst} 
              name="send" 
              size={25} 
              color="#fff"synthetic event
              onPress={async () => {await stopRecording("send")}} 
            />
          </View>
        )
      }
    </View>
  )
}

export default MessageEditor