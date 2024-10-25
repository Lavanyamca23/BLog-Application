import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({ item, navigation, index }) => {
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return (
    <View className="px-4  my-2 ">
      <TouchableOpacity
        className="   rounded-md "
        onPress={() =>
          navigation.navigate("NewsViewer", {
            url: item.url,
          })
        }
      >
        <View className="p-2 border-2 border-gray-400 rounded-md">
          <Image
            source={{
              uri: item.urlToImage
                ? item.urlToImage
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s",
            }}
            className="h-52 w-full rounded-md"
            resizeMethod="resize"
          />
          <Text className="text-lg text-gray-700 font-SemiBold">
            {item.title}
          </Text>
          {/* <Text className="text-xl  ">{item.description}</Text> */}
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-blue-600 my-2 ">
              {item.author}
            </Text>
            <Text className="text-md text-gray-700 ">
              {new Date(item.publishedAt).toLocaleString("en-IN", options)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
