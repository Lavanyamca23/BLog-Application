import { View, FlatList, Alert, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ViewCard from "../Components/ViewCard";
import axios from "axios";

export default function BlogView({ navigation }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    HandleBlog();
  }, []);

  const HandleBlog = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`http://192.168.209.10:8080/demo/blog`);

      // Sort using localeCompare for the CreatedAt strings
      const sortedData = res.data.sort((a, b) => b.CreatedAt.localeCompare(a.CreatedAt));

      setData(sortedData);
    } catch (error) {
      Alert.alert(
        "Fetch Failed",
        error.response?.data?.message || "Network Error"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <View className="flex-1 mt-10">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <ViewCard data={item} index={index} navigation={navigation} />
        )}
        refreshing={loader} 
        onRefresh={HandleBlog} 
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-5">
            <Text className="text-lg text-gray-500">No Blogs Available</Text>
          </View>
        }
      />
    </View>
  );
}
