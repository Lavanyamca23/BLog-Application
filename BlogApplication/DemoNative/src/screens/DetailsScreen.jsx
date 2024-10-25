import { View, Text, Image } from "react-native";
import React from "react";

export default function DetailsScreen({ route }) {
  const { data } = route.params;

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 mt-10 px-4">
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-2xl text-gray-500">{data.Title}</Text>
        <Text className="text-2xl text-gray-500">
          Category : {data.Category}
        </Text>
      </View>
      <Image
        source={{
          uri:
            data.Image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s",
        }}
        className="h-[40vh] w-full rounded-md"
        resizeMode="cover" // Use cover for better image fitting
      />

      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-lg font-bold text-blue-600">{data.Author}</Text>
        <Text className="text-md text-gray-700">{data.CreatedAt}</Text>
      </View>
      <Text className="text-lg underline text-gray-700 my-2">
        {data.Description}
      </Text>
      <Text className="text-2xl text-gray-700 text-justify my-2">{data.Content}</Text>
    </View>
  );
}
