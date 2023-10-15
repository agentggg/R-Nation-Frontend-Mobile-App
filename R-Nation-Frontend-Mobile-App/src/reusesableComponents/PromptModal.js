import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, SafeAreaView, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';

const PromptModal = ({ isVisible, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      onSubmit(comment);
      setComment('');
      onClose();
    }
  };

  
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
        <ScrollView>
            <Text style={styles.modelTitle}>Thank you for being willing!</Text>
            <Text style={styles.modalText}>Your feedback is essential in ensuring that we continue to meet the expectations of our community. We encourage you to be as detailed as possible in sharing why you felt that the announcement was out of order. Your insights will aid us in identifying areas that require improvement and enable us to enhance our communication to better serve you.</Text>
            <Text style={styles.modalText}>Please rest assured that at RAW Ministry, every piece of feedback is taken seriously. We thoroughly review and analyze each comment and suggestion provided. Your feedback plays a crucial role in shaping our future announcements and ensuring they align with the needs and expectations of our community.</Text>
            <Text style={styles.modalText}>Once again, thank you for your valuable feedback. We look forward to hearing more from you and working together to create a better experience for everyone.</Text>
            <TextInput
                style={[styles.input, { flexWrap: 'wrap' }]} // Apply flexWrap to TextInput
                placeholder='Add your feedback here'
                value={comment}
                onChangeText={handleCommentChange}
                multiline={true}
            />
            <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={() => [onClose(), setComment('')]} />
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    maxWidth: width,
    maxHeight: height,
    marginBottom: '30%',
    marginTop: '25%',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    color: '#000',
    
  },
  modelTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  input: {
    flex: 1,
    width: width - 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#000',
    borderWidth: 2,
    paddingBottom: 100,
    paddingTop: 10,
    paddingLeft: '3%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PromptModal;
