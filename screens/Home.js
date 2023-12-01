import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Hero from '../components/Hero';
import Menu from '../components/Menu';

const Home = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userProfileDataString = await AsyncStorage.getItem(
          'userProfileData'
        );
        if (userProfileDataString) {
          const userProfileData = JSON.parse(userProfileDataString);
          setFirstName(userProfileData.firstName);
          setLastName(userProfileData.lastName);
          setImage(userProfileData.image);
        }
      } catch (error) {
        console.error('Failed to load user profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const userInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    return '';
  };

  return (
    <>
      <View style={styles.header}>
        <IconButton
          icon="keyboard-backspace"
          color="#495E57"
          size={20}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else navigation.navigate('Profile');
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
      <Hero />
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginVertical: 10,
  },
  logo: {
    marginVertical: 10,
    width: 185,
    height: 40,
  },
});

export default Home;
