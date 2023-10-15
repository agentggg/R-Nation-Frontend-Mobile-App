import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const FireworksPopup = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Show Fireworks</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Fireworks Popup</Text>
          <LottieView
            source={require('../../assets/animations/fireworks.json')} // Replace with your animation source
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default FireworksPopup;
