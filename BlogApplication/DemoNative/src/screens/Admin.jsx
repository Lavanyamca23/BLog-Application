import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

export default function Admin({navigation}) {
  const [data, setData] = useState({});

  useEffect(() => {
    getCountData();
  }, []);

  const getCountData = async () => {
    try {
      let res = await axios.get(`http://192.168.209.10:8080/demo/user`);
      setData(res.data); // Update the state with the response data
    } catch (error) {
      Alert.alert("Data Fetch Failed", error.response?.data || "Network Error");
    }
  };

  const handleRefresh = () => {
    getCountData();
    setData({});
  };

  return (
    <View className="flex-1 mt-10 px-5">
      <View className="flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
        <View className="flex-1">
          <Text className="text-2xl font-semibold text-gray-700">
            Admin Panel
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleRefresh}>
            <MaterialCommunityIcons name="refresh" color="#000" size={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            navigation.navigate("Login");
          }} className="bg-black h-10 w-10 rounded-full flex justify-center items-center border-2 border-red-600 ml-4">
            <MaterialCommunityIcons name="logout" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md my-2">
        <View className="flex-1">
          <Text className="text-2xl text-center text-red-400">Users Count</Text>
          <View className="justify-center items-center my-10">
            {data.usercount !== undefined ? (
              <Text className="text-5xl font-semibold text-center">
                {data.usercount}
              </Text>
            ) : (
              <ActivityIndicator color="#db393c" size={36} />
            )}
          </View>
        </View>

        <View className="w-1 h-full rounded-lg bg-red-400 mx-2" />

        <View className="flex-1">
          <Text className="text-2xl text-center text-red-400">Blogs Count</Text>
          <View className="justify-center items-center my-10">
            {data.blogcount !== undefined ? (
              <Text className="text-5xl font-semibold text-center">
                {data.blogcount}
              </Text>
            ) : (
              <ActivityIndicator color="#db393c" size={36} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
