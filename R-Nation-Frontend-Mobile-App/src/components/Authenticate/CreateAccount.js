import { StyleSheet, ScrollView, Text, View, Keyboard, Alert, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native'
import React, {useState, useEffect } from 'react'
import axios from 'axios'
import getIpAddress from '../../../config';
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BugReport from '../../reusesableComponents/BugReport';

const CreateAccount = ({navigation}) => {
    const ipAddress = getIpAddress();
    const commonPasswords = [
      '123456',
      'Password',
      'password',
      '123456789',
      '12345678',
      '12345',
      '1234567',
      '1234567890',
      'admin',
      '1234',
      'welcome',
      'password1',
      'qwerty',
      'abc123',
      'letmein',
      'monkey',
      'dragon',
      'baseball',
      'football',
      'iloveyou',
      'starwars',
      'princess',
      'sunshine',
      'shadow',
      'master',
      'superman',
      'batman',
      'trustno1',
      'hannah',
      'password2',
      'password3',
      'password4',
      'password5',
      'password6',
      'password7',
      'password8',
      'password9',
      'password0',
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm',
      'qwerty123',
      'asdfgh123',
      'iloveyou1',
      'iloveyou2',
      'iloveyou3',
      'letmein1',
      'letmein2',
      'letmein3',
      'monkey1',
      'monkey2',
      'monkey3',
      'sunshine1',
      'sunshine2',
      'sunshine3',
      'admin1',
      'admin2',
      'admin3',
      'shadow1',
      'shadow2',
      'shadow3',
      'princess1',
      'princess2',
      'princess3',
      'dragon1',
      'dragon2',
      'dragon3',
      'football1',
      'football2',
      'football3',
      'baseball1',
      'baseball2',
      'baseball3',
      'starwars1',
      'starwars2',
      'starwars3',
      'master1',
      'master2',
      'master3',
      'superman1',
      'superman2',
      'superman3',
      'batman1',
      'batman2',
      'batman3',
      'trustno11',
      'trustno12',
      'trustno13',
      'hannah1',
      'hannah2',
      'hannah3',
      'passw0rd',
      'password!',
      'password!!',
      'password!!!',
      'password!!!!',
      'password123',
      'password456',
      'password789',
      'password1234',
      'password12345',
      'password123456',
      'password123456789',
      'passwordadmin',
      'passwordletmein',
      'passwordmonkey',
      'passwordshadow',
      'passwordsunshine',
      'passwordabc123',
      'passwordqwerty',
      'passwordasdfgh',
      'passwordzxcvbn',
      'passwordbaseball',
      'passwordfootball',
      'passwordiloveyou',
      'passwordstarwars',
      'passwordprincess',
      'passwordshadow',
      'passwordmaster',
      'passwordsuperman',
      'passwordbatman',
      'passwordhannah',
      'passwordtrustno1',
      'passwordqwertyuiop',
      'passwordasdfghjkl',
      'passwordzxcvbnm',
      ...commonPasswords,
    ]; 
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [accessNumber, setAccessNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [showButton, setShowButton] = useState(false)

    const USERNAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{0,148}[a-zA-Z0-9]$/;
    const regexCapital = /^(?=.*[a-z])(?=.*[A-Z])[^\s]{8,}$/;

    const handleUsernameChange = (value) => {
      setUsernameIsValid(USERNAME_REGEX.test(value));
    }
    const handleEmailChange = (value) => {
      setEmail(value);
    
      if (value.length === 0) {
        setEmailError(null);
        return;
      }
    
      const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      
      setEmailError(false);
    }
    const handlePasswordChange = (value) => {
      setPassword(value);
      // Check length
      if (value.length < 8) {
        setPasswordError('Password must contain at least 8 characters.');
        return;
      }
  
      // Check if entirely numeric
      if (/^\d+$/.test(value)) {
        setPasswordError('Password cannot be entirely numeric.');
        return;
      }

      if (!regexCapital.test(value)) {
        setPasswordError('Password must contain both uppercase and lowercase letters.');
        return;
      }
      // Check similarity to personal information
      const username = 'example';
      const email = 'example@example.com';
      if (value.includes(username) || value.includes(email)) {
        setPasswordError('Password cannot be too similar to your other personal information.');
        return;
      }
  
      
      // Check if common password
      if (commonPasswords.includes(value)) {
        setPasswordError('Password cannot be a common password that has been leaked in data breaches or is easily guessable.');
        return;
      }
        setPasswordIsValid(true)
        setPasswordError(false);
    }
    const postApiResponse = async() => {
      const postApiData = {
        username:username, password:password, profileName:username, 
        firstName:firstName, lastName:lastName, email:email
      }
      const postApiCall = await axios.post(`${ipAddress}/create_account`,postApiData)
      if (postApiCall.data == 'successful'){
        Alert.alert("✅", "Account created",
        [{text: 'OK', onPress: () => {navigation.goBack()}}]
        )
      }
      else{
        Alert.alert("🚫Error", postApiCall.data)
          }
    }
    const handleConfirmPasswordChange = (text) => {
      setConfirmPassword(text);
      if (text !== password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError(false);
      }
    };

    useEffect(() => {
      if (emailError === false && confirmPasswordError === false) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }, [emailError, confirmPasswordError]);

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
            <ScrollView>
            <BugReport style={{ paddingRight: 0}} color="red"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.container}>
                <TextInput
                autoCompleteType='name'
                style={styles.fieldData}
                value={firstName}
                autoCorrect={false}
                onChangeText={(text) => {
                  setFirstName(text);
                }}
                placeholder="First name"
                clearButtonMode="always"
                returnKeyType="next"
                />
                <TextInput
                autoCompleteType="name"
                style={styles.fieldData}
                value={lastName}
                autoCorrect={false}
                onChangeText={(text) => {
                setLastName(text);
                }}
                placeholder="Last name"
                clearButtonMode="always"
                returnKeyType="next"
                />
                <TextInput
                autoCompleteType="email"
                style={styles.fieldData}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                setEmail(text);
                handleEmailChange(text)
                }}
                placeholder="Email"
                clearButtonMode="always"
                returnKeyType="next"
                />
                {emailError && (
                  <Text style={{ color: 'red' }}>{emailError}</Text>
                )}
                <TextInput
                style={styles.fieldData}
                value={accessNumber}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  setAccessNumber(text);
                }}
                placeholder="Access number. Leave blank if none"
                clearButtonMode="always"
                returnKeyType="next"
                />
                <TextInput
                  autoCompleteType="username|current-password"
                  style={[styles.fieldData, { color: usernameIsValid ? 'black' : 'red' }]}
                  value={username}
                  autoCapitalize="none"
                  
                  autoCorrect={false}
                  onChangeText={(text) => {
                    setUserName(text);
                    handleUsernameChange(text);
                  }}
                  placeholder="Username"
                  clearButtonMode="always"
                  returnKeyType="next"  
                />
                {!usernameIsValid &&
                <>
                  <Text style={{ color: 'red' }}>Please enter a valid username.</Text>
                  <Text style={styles.text}>
                  &#8226;Username is used to sign in, and for friend search{"\n"}
                  &#8226;Between 1 and 150 characters in length.{"\n"}
                  &#8226;May only contain letters, digits, and the characters @, ., +, -, and _.{"\n"}
                  &#8226;May not begin or end with the characters ., +, -, or _.{"\n"}
                  &#8226;May not begin or end with the characters ., +, -, or _.
                </Text>
                </> }
                <View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    autoCompleteType="new-password"
                    style={[
                      styles.fieldData,
                      passwordError ? { color: "red" } : { color: "black" },
                    ]}
                    value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password"
                    returnKeyType="next"
                    onChangeText={handlePasswordChange}
                  />
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#777"
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                  {passwordError && <Text style={styles.error}>{passwordError}</Text>}
                </View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    autoCompleteType="new-password"
                    style={[
                      styles.fieldData,
                      confirmPasswordError ? { color: "red" } : { color: "black" },
                    ]}
                    value={confirmPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Confirm Password"
                    returnKeyType="done"
                    onChangeText={handleConfirmPasswordChange}
                  />
                  {confirmPasswordError && (
                    <Text style={styles.error}>{confirmPasswordError}</Text>
                  )}
                </View>
                </View>
              <View style={styles.buttons}>
                {showButton ? <>
                <TouchableOpacity onPress={postApiResponse}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                </> : <></>}
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.buttonText}>Go back</Text>
                </TouchableOpacity>
              </View>
              </View>
            </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      
    )
}

export default CreateAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  fieldData: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    color: "#555",
    fontSize: 16,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  buttonText: {
    backgroundColor: "#D70040",
    borderRadius: 5,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    width: 150,
  }   
});