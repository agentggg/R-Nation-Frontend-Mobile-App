import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';
import ErrorReport from '../reusesableComponents/ErrorReport';
import * as Device from 'expo-device';
import LottieView from 'lottie-react-native';
import PromptModal from '../reusesableComponents/PromptModal';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS = 'https://jsonplaceholder.typicode.com/posts/1/comments'

function AnnouncementPage() {
  const [isModalVisible, setModalVisible] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [animationFile, setAnimationFile] = useState()

  useEffect(()=>{
    const animationSource = require('../../assets/animations/fireworks.json');
    setAnimationFile(animationSource);
  })

  const { data: announcements, isLoading: loadingAnnoucements, isError: errorAnnouncements } = useQuery('announcements', async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });

  const { data: comments, isLoading: loadingComments, isError: errorComments } = useQuery('comments', async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });

  if (loadingAnnoucements || loadingComments) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 8, fontSize: 25, color: '#FFFF', textAlign:'center' }}>Checking what's on the board for today.. 🤔💭</Text>
      </View>
    )
  }

  if (errorAnnouncements || errorComments) {
    return (
      <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=>reportCrash('announcements')}>
        <Image
          source={require('../../assets/404.png')} 
          style={{ flex: 1, width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
    )
  }

  const profileInfo = {
    username: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
  };

  const reportCrash = async (view) => {
    const deviceInfo = await {
      view: view,
      deviceMake: Device.manufacturer,
      deviceModel: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      browserType: Device.browserName, // Note: This may not be available in all environments
      timestamp: new Date().getTime(),
      profileInfo: profileInfo
    };
    ErrorReport(deviceInfo)
  }

  const handeDislikeButton = () => {
    Alert.alert(
      "Thank you for the feedback!",
      "Would you be willing to help us do better by providing us with feedback please?",
      [
        {
          text: "No, I don't want to help",
          style: "cancel"
        },
        {
          text: "Yes, I want to help with my feedback",
          onPress: () => {
            setShowModal(true)
            setModalVisible(true)
          }
        }
      ]
    )


  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleLikeButtonPress = () => {
    setShowFireworks(true);
  }

  const handleSubmitComment = (submittedComment) => {
    console.log('Submitted Comment:', submittedComment);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showFireworks ? (
        <View style={styles.fireworksContainer}>
          <LottieView
            source={animationFile}
            autoPlay
            loop={false} // Set loop to false to play the animation only once
            style={styles.fireworks}
            onAnimationFinish={() => setShowFireworks(false)} // Hide animation when it finishes
          />
        </View>
      ) : <></>}
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image
              source={{ uri: 'https://www.hrcloud.com/hubfs/assets/company-announcements/hero_mobile@2x.png' }}
              style={styles.image}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.date}>{item.userId}</Text>
              <Text style={styles.subject}>{item.title}</Text>
              <Text style={styles.details}>{item.body}</Text>
              <View style={styles.actionsContainer}>
                <Text>{item.id}</Text>
                <TouchableOpacity style={styles.actionButton} onPress={()=>handleLikeButtonPress()}>
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handeDislikeButton}>
                  <Text style={styles.actionText}>Dislike</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {showModal ?
        <PromptModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmitComment}
        />
      :<></>
      } 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFF', // Updated background color
    borderRadius: 10,
    margin: 16,
    overflow: 'hidden',
    elevation: 20,
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 200, // Set the height of the image as desired
  },
  contentContainer: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007BFF', // Button background color
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
  },
  actionText: {
    color: '#fff', // Text color is white
    textAlign: 'center',
  },
  commentsContainer: {
    marginTop: 16,
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  commentButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  comment: {
    flexDirection: 'row', // Align user avatar and comment text horizontally
    alignItems: 'center', // Center vertically
    marginBottom: 8,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make the image circular
    marginRight: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333', // Text color
  },
  fireworksContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fireworks: {
    width: 2000,
    height: 2000,
    marginTop: '5%',
  },
});

export default AnnouncementPage;
