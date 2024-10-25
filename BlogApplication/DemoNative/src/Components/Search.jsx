import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import Card from './Card';
  
  const Search = ({navigation}) => {
    const [SearchText, setSearchText] = useState('');
    const [Data, setData] = useState([]);
    const searchNews = async text => {
      setSearchText(text);
      if (text.length > 2) {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=6d15275bbaf14b2e8caec346b11be5dd&q=${text}`,
        );
  
        const data = await response.json();
        setData(data.articles);
      }
    };
    return (
      <View className="flex-1 mt-10 ">
        <View className="flex-row mx-4 px-4 py-3 justify-center items-center bg-white shadow-lg rounded-lg ">
          <TouchableOpacity  onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
              name="arrow-left-bold-circle"
              color='#000'
              size={25}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter your query.."
            value={SearchText}
            placeholderTextColor={'white'}
            onChangeText={text => {
              searchNews(text);
            }}
            className="text-sm py-2 px-2 rounded-lg text-white bg-black w-[90%] mx-auto"
          />
        </View>
  
        <View className="mb-16">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item, index}) => {
              return <Card item={item} navigation={navigation} index={index} />;
            }}
          />
        </View>
      </View>
    );
  };
  
  export default Search;

  