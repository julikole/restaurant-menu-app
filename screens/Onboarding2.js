import * as React from 'react';

import { TextInput, HelperText } from 'react-native-paper';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import validateemail from '../utils/validateemail';
import { useFonts, Karla_800ExtraBold } from '@expo-google-fonts/karla';

const Onboarding2 = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [nameTouched, setNameTouched] = React.useState(false);

  const isNameValid = () => {
    const regex = /^[A-Za-z\s]+$/;
    return (
      firstName &&
      regex.test(firstName) &&
      firstName.length >= 2 &&
      firstName.length <= 30
    );
  };

  const isEmailValid = () => {
    return email && validateemail(email);
  };

  const isFormValid = !isEmailValid(email) || !isNameValid(firstName);

  let [fontsLoaded] = useFonts({
    Karla_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, padding: 10 }}
      onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
        <Text style={styles.text}>Let us get acquainted!</Text>
        <View style={styles.inputView}>
          <ImageBackground
            source={require('../assets/logo-grey.png')}
            resizeMode="contain"
            style={styles.image}>
            <TextInput
              label="Name"
              placeholder="type your name here"
              value={firstName}
              onChangeText={(firstName) => {
                setFirstName(firstName);
                setNameTouched(true);
              }}
              mode="outlined"
              maxLength={30}
              minlength={2}
              right={<TextInput.Affix text={`${firstName.length}/30`} />}
              theme={{ roundness: 8, colors: { primary: '#495E57' } }}
              keyboardType="default"
              clearButtonMode={'while-editing'}
              editable
            />
            <HelperText
              type="error"
              visible={nameTouched && !isNameValid(firstName)}>
              {firstName.length < 2 || firstName.length > 30
                ? 'Name must be between 2 and 30 characters!'
                : 'Name can only contain letters!'}
            </HelperText>

            <TextInput
              label="E-mail"
              placeholder="type your e-mail here"
              value={email}
              onChangeText={(email) => {
                setEmail(email);
                setEmailTouched(true);
              }}
              mode="outlined"
              maxLength={30}
              minlength={2}
              right={<TextInput.Affix text={`${email.length}/30`} />}
              theme={{ roundness: 8, colors: { primary: '#495E57' } }}
              keyboardType="email-address"
              clearButtonMode={'while-editing'}
              autoCapitalize="none"
              editable
            />
            <HelperText
              type="error"
              visible={emailTouched && !isEmailValid(email)}>
              Email address is invalid!
            </HelperText>
          </ImageBackground>
        </View>
        <PrimaryButton
          disabled={isFormValid}
          style={{ marginBottom: 10 }}
          onPress={() => {
            navigation.navigate('Profile', {
              firstName: firstName,
              email: email,
            });
          }}>
          Sign up
        </PrimaryButton>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#EDEFEE',
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Karla_800ExtraBold',
    color: '#495E57',
  },
  inputView: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '95%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Onboarding2;
