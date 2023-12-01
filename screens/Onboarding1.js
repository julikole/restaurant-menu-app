import * as React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useFonts, Karla_800ExtraBold } from '@expo-google-fonts/karla';

const Onboarding1 = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Karla_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.outerContainer}>
      <Image
        style={{
          height: 300,
          width: 300,
          resizeMode: 'contain',
          marginBottom: 32,
        }}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.text}>In the mood for Italian today?</Text>
      <PrimaryButton
        onPress={() => {
          navigation.navigate('Sign up');
        }}>
        Yes!
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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
});

export default Onboarding1;
