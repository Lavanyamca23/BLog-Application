import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function ViewCard({ data, index, navigation }) {
  return (
    <View className="px-4 my-1">
      <TouchableOpacity
        className="rounded-md"
        key={index}
        onPress={() => {
          navigation.navigate('Detailscreen', {
              data: data,
            })
        }}
      >
        <View className="p-2 border-2 border-gray-400 rounded-md">
          <Image
            source={{
              uri: data.Image
                ? data.Image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s",
            }}
            className="h-[25vh] w-full rounded-md"
            resizeMode="cover" // Use cover for better image fitting
          />
          <Text className="text-lg text-gray-700 font-semibold mt-2">
            {data.Title}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-lg font-bold text-blue-600">
              {data.Author}
            </Text>
            <Text className="text-md text-gray-700">{data.CreatedAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
