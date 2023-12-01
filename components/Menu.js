import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  Alert,
  Image,
} from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../utils/database';
import Filters from './Filters';
import { getSectionListData, useUpdateEffect } from '../utils/utils';
import {
  useFonts,
  Karla_800ExtraBold,
  Karla_700Bold,
  Karla_400Regular,
  Karla_500Medium,
} from '@expo-google-fonts/karla';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['starters', 'mains', 'desserts'];

const Item = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.price}>${price}</Text>
    </View>
    <Image
      style={styles.itemImage}
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
      }}
    />
  </View>
);

const Menu = () => {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      return menu;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  let [fontsLoaded] = useFonts({
    Karla_800ExtraBold,
    Karla_700Bold,
    Karla_400Regular,
    Karla_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Searchbar
          placeholder="Search menu"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          inputStyle={{ color: '#333333' }}
          elevation={0}
          theme={{ roundness: 16 }}
        />
      </View>
      <View style={styles.deliveryContainer}>
        <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
        <IconButton
          icon="truck-delivery-outline"
          color="#495E57"
          size={20}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        )}
        // renderSectionHeader={({ section: { name } }) => (
        //   <Text style={styles.itemHeader}>{name}</Text>
        // )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginTop: 5,
    backgroundColor: '#e4e4e4',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#000000',
    paddingBottom: 5,
    fontFamily: 'Karla_700Bold',
  },
  description: {
    color: '#495e57',
    paddingRight: 5,
    fontFamily: 'Karla_400Regular',
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#EE9972',
    paddingTop: 5,
    fontFamily: 'Karla_500Medium',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  searchBox: {
    backgroundColor: '#495e57',
    padding: 10,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delivery: {
    fontSize: 20,
    padding: 15,
    fontFamily: 'Karla_800ExtraBold',
  },
});

export default Menu;
