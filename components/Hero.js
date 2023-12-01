import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useFonts, Karla_400Regular } from '@expo-google-fonts/karla';
import { MarkaziText_400Regular } from '@expo-google-fonts/markazi-text';

const Hero = () => {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    Karla_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, padding: 10 }}
      onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.heroContainer}>
        <Text style={styles.headerText}>Little Lemon</Text>
        <View style={styles.outerHero}>
          <View style={styles.hero}>
            <Text style={styles.heroHeader}>Chicago</Text>
            <Text style={styles.heroText}>
              We are a family owned Mediterranean Restaurant, focused on
              traditional recipes served with a modern twist
            </Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={require('../assets/hero-image.png')}
              resizeMode="cover"
              style={styles.heroImg}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 45,
    color: '#F4CE14',
    fontFamily: 'MarkaziText_400Regular',
  },
  outerHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  hero: {
    flex: 1,
    marginRight: 10,
  },
  heroHeader: {
    fontSize: 38,
    color: '#FFFFFF',
    fontFamily: 'MarkaziText_400Regular',
  },
  heroText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Karla_400Regular',
  },
  imgContainer: {
    marginLeft: 0,
  },
  heroImg: {
    width: 110,
    height: 120,
    borderRadius: 8,
  },
});

export default Hero;
