import { View, Text, TextInput } from 'react-native'
import styles from '../../screens/messages/style'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import messageContext from '../../data-manager/context/messageContext'
import { Audio } from 'expo-av'

const MessageEditor = () => {
  // Set local state
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState();
  const [recordingTime, setRecordingTime] = useState(0)

  // Get data from global state
  // const { changeImage } = useContext(imageContext)
  const { addMessage, addVoiceMessage } = useContext(messageContext)

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

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');

      setIsRecording(true)

      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording(action) {
    console.log('Stopping recording..');
    // setRecording(undefined);
    await recording.stopAndUnloadAsync();

    if (action === "send") {
      const uri = recording.getURI();

      addVoiceMessage(uri)
    }

    setIsRecording(false)
    setRecordingTime(0)
  }

  const ChangeIcon = () => {
    if (message.length > 0) {
      return "send"
    }

    return "mic-sharp"
  }

  const handleSendMessage = async () => {
    if (message.length > 0) {
      addMessage(message, image)

      console.log(message)

      setMessage("")
      setImage(null)
    } else {
      try {
        await startRecording()
      } catch (err) {
        console.error(err)
      }
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
          <>
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
            <Ionicons
              style={styles.messageEditorIconFirst} 
              name={ChangeIcon()} 
              size={25} 
              color="#fff"synthetic event
              onPress={async () => await handleSendMessage()} 
            />
          </>
        ):(
          <View style={styles.messageInput}>
            <Text style={styles.voiceRecorderTimer}>{ formatDuration() }</Text>

            <Ionicons
              style={styles.messageEditorIconSecond} 
              name="close" 
              size={25} 
              color="#fff"synthetic event
              onPress={async () => await stopRecording("close")} 
            />
            <Ionicons
              style={styles.messageEditorIconFirst} 
              name="send" 
              size={25} 
              color="#fff"synthetic event
              onPress={async () => await stopRecording("send")} 
            />
          </View>
        )
      }
    </View>
  )
}

export default MessageEditor