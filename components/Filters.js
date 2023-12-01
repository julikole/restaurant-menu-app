import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts, Karla_800ExtraBold } from '@expo-google-fonts/karla';

const Filters = ({ onChange, selections, sections }) => {
  let [fontsLoaded] = useFonts({
    Karla_800ExtraBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: selections[index] ? '#495e57' : '#edefee',
            borderRadius: 16,
            marginRight: 15,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Karla_800ExtraBold',
                color: selections[index] ? '#edefee' : '#495e57',
              }}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 15,
  },
});

export default Filters;
