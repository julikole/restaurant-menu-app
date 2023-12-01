import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Avatar,
  TextInput,
  Button,
  Checkbox,
  IconButton,
  HelperText,
  Divider,
} from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import validateemail from '../utils/validateemail';
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
  Karla_500Medium,
} from '@expo-google-fonts/karla';

const Profile = ({ navigation, route }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [firstNameTouched, setFirstNameTouched] = React.useState(false);
  const [lastNameTouched, setLastNameTouched] = React.useState(false);
  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [statusesChecked, setStatusesChecked] = React.useState(false);
  const [offersChecked, setOffersChecked] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const mask = '+1 (999) 999-9999';

  const isFirstNameValid = () => {
    const regex = /^[A-Za-z\s]+$/;
    return (
      firstName &&
      regex.test(firstName) &&
      firstName.length >= 2 &&
      firstName.length <= 30
    );
  };

  const isLastNameValid = () => {
    const regex = /^[A-Za-z\s]+$/;
    return (
      lastName &&
      regex.test(lastName) &&
      lastName.length >= 2 &&
      lastName.length <= 30
    );
  };

  const isEmailValid = () => {
    return email && validateemail(email);
  };

  const isPhoneValid = () => {
    const regex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    return phoneNumber && regex.test(phoneNumber);
  };

  const isFormValid =
    !isEmailValid(email) ||
    !isLastNameValid(lastName) ||
    !isFirstNameValid ||
    !isPhoneValid;

  React.useEffect(() => {
    const fetchData = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied');
        }
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (route.params) {
      const { firstName, email } = route.params;
      setFirstName(firstName);
      setEmail(email);
    }
  }, [route.params]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userProfileData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber);
          setStatusesChecked(userData.statusesChecked);
          setOffersChecked(userData.offersChecked);
          setImage(userData.image);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };

    loadData();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const userInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    return '';
  };

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setEmailTouched(false);
    setFirstNameTouched(false);
    setLastNameTouched(false);
    setPhoneTouched(false);
    setStatusesChecked(false);
    setOffersChecked(false);
    setImage(null);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userProfileData');
      console.log('Data cleared');
      // reset the state values after logout
      handleCancel();
    } catch (error) {
      console.error('Failed to clear the stored data', error);
    }
  };

  const saveData = async () => {
    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        statusesChecked: statusesChecked,
        offersChecked: offersChecked,
        image: image,
      };

      await AsyncStorage.setItem('userProfileData', JSON.stringify(userData));
      console.log('Data saved');
    } catch (error) {
      console.error('Failed to save the data to the storage', error);
    }
  };

  let [fontsLoaded] = useFonts({
    Karla_700Bold,
    Karla_400Regular,
    Karla_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      indicatorStyle={'black'}
      horizontal={false}
      vertical={true}
      automaticallyAdjustKeyboardInsets={true}
      keyboardDismissMode="on-drag">
      <View style={styles.outerContainer}>
        <View style={styles.header}>
          <IconButton
            icon="keyboard-backspace"
            color="#495E57"
            size={20}
            // onPress={() => {navigation.popToTop()}}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else navigation.navigate('Home');
            }}
          />
          <Image
            style={styles.logo}
            source={require('../assets/Logo-header.png')}
            resizeMode="cover"
            accessible={true}
            accessibilityLabel={'Little Lemon Logo'}
          />
          {image ? (
            <Avatar.Image size={34} source={{ uri: image }} />
          ) : firstName && lastName ? (
            <Avatar.Text
              size={34}
              label={userInitials()}
              theme={{ colors: { primary: '#FBDABB' } }}
            />
          ) : (
            <Avatar.Icon
              size={34}
              icon="account"
              theme={{ colors: { primary: '#FBDABB' } }}
            />
          )}
        </View>
        <Text style={styles.text}>Personal Information</Text>
        <View style={styles.avatar}>
          {image ? (
            <Avatar.Image size={120} source={{ uri: image }} />
          ) : firstName && lastName ? (
            <Avatar.Text
              size={120}
              label={userInitials()}
              theme={{ colors: { primary: '#FBDABB' } }}
            />
          ) : (
            <Avatar.Icon
              size={120}
              icon="account"
              theme={{ colors: { primary: '#FBDABB' } }}
            />
          )}
          <IconButton
            style={styles.cameraBtn}
            icon="camera-plus"
            color={'#495E57'}
            size={35}
            onPress={PickImage}
            mode="outlined"
            theme={{ colors: { primary: '#495E57' } }}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            label="First Name*"
            placeholder="type your first name here"
            value={firstName}
            onChangeText={(firstName) => {
              setFirstName(firstName);
              setFirstNameTouched(true);
            }}
            mode="outlined"
            maxLength={30}
            minlength={2}
            dense="true"
            right={<TextInput.Affix text={`${firstName.length}/30`} />}
            theme={{ roundness: 8, colors: { primary: '#495E57' } }}
            keyboardType="default"
            clearButtonMode={'while-editing'}
            editable
          />
          <HelperText
            type="error"
            visible={firstNameTouched && !isFirstNameValid(firstName)}>
            {firstName.length < 2 || firstName.length > 30
              ? 'Name must be between 2 and 30 characters!'
              : 'Name can only contain letters!'}
          </HelperText>
          <TextInput
            dense="true"
            label="Last Name*"
            placeholder="type your last name here"
            value={lastName}
            onChangeText={(lastName) => {
              setLastName(lastName);
              setLastNameTouched(true);
            }}
            mode="outlined"
            maxLength={30}
            minlength={2}
            right={<TextInput.Affix text={`${lastName.length}/30`} />}
            theme={{ roundness: 8, colors: { primary: '#495E57' } }}
            keyboardType="default"
            clearButtonMode={'while-editing'}
            editable
          />
          <HelperText
            type="error"
            visible={lastNameTouched && !isLastNameValid(lastName)}>
            {lastName.length < 2 || lastName.length > 30
              ? 'Name must be between 2 and 30 characters!'
              : 'Name can only contain letters!'}
          </HelperText>
          <TextInput
            dense="true"
            label="E-mail*"
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
            editable
            autoCapitalize="none"
          />
          <HelperText
            type="error"
            visible={emailTouched && !isEmailValid(email)}>
            Email address is invalid!
          </HelperText>
          <TextInput
            dense="true"
            label="Phone number*"
            placeholder="+1 (234) 567-8900"
            value={phoneNumber}
            onChangeText={(phoneNumber) => {
              setPhoneNumber(phoneNumber);
              setPhoneTouched(true);
            }}
            render={(props) => (
              <MaskedTextInput
                {...props}
                mask={mask}
                keyboardType="phone-pad"
                theme={{ roundness: 8, colors: { primary: '#495E57' } }}
              />
            )}
            mode="outlined"
            maxLength={17}
            minlength={2}
            right={<TextInput.Affix text={`${phoneNumber.length}/17`} />}
            theme={{ roundness: 8, colors: { primary: '#495E57' } }}
            clearButtonMode={'while-editing'}
            editable
          />
          <HelperText
            type="error"
            visible={phoneTouched && !isPhoneValid(phoneNumber)}>
            Phone number format is invalid!
          </HelperText>
          <Divider style={{ height: 1, marginVertical: 10 }} />
        </View>
        <Text style={styles.text}>Notify me</Text>
        <View style={styles.checkboxes}>
          <Checkbox.Item
            status={statusesChecked ? 'checked' : 'unchecked'}
            onPress={() => setStatusesChecked(!statusesChecked)}
            color={'#495E57'}
            mode="android"
            position="leading"
            label="Order Statuses"
          />

          <Checkbox.Item
            status={offersChecked ? 'checked' : 'unchecked'}
            onPress={() => setOffersChecked(!offersChecked)}
            color={'#495E57'}
            mode="android"
            position="leading"
            label="Special offers"
          />
          <Divider style={{ height: 1, marginVertical: 10 }} />
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={handleCancel}
            color={'#495E57'}
            mode="outlined"
            style={{
              borderWidth: 2,
              borderColor: '#495E57',
              borderRadius: 8,
              width: 110,
              margin: 10,
            }}>
            Discard
          </Button>
          <Button
            onPress={() => {
              saveData();
              navigation.navigate('Home');
            }}
            color={'#495E57'}
            mode="contained"
            disabled={isFormValid}
            style={{ borderRadius: 8, width: 110, margin: 10 }}>
            Save
          </Button>
          <Button
            onPress={() => {
              handleLogout();
              navigation.navigate('Welcome');
            }}
            color={'#F4CE14'}
            fontFamily={'Karla_400Regular'}
            mode="contained"
            style={{
              borderRadius: 8,
              width: 280,
              margin: 10,
              fontFamily: 'Karla_400Regular',
            }}>
            Log out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EDEFEE',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Karla_700Bold',
    marginVertical: 10,
  },
  logo: {
    marginVertical: 10,
    width: 185,
    height: 40,
  },
  avatar: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraBtn: {
    margin: 5,
    position: 'absolute',
    bottom: 0,
    right: -20,
  },
  inputFields: {
    width: '100%',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  checkboxes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    width: '100%',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
});

export default Profile;
