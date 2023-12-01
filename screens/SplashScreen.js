import * as React from 'react';

import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.outerContainer}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
        resizeMode="center"
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#EDEFEE',
  },
  logo: {
    height: 100,
    width: 300,
  },
});

export default SplashScreen;
