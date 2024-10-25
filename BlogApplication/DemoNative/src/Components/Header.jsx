import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Search")}
      className="flex-row mx-4 px-4 py-3 mt-10 justify-between items-center bg-white shadow-lg rounded-lg "
    >
      <Text className=" text-lg text-red-500">Blog Live</Text>

      <MaterialCommunityIcons name="magnify" color="#000" size={25} />
    </TouchableOpacity>
  );
};

export default Header;
