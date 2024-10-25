import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import secOneBg from "../../assets/sec1-bg.png";
import axios from "axios";

export default function Register({ navigation }) {
  const [fdata, setFdata] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    ConPassword: "",
  });

  const HandleRegister = async () => {
    if (
      !fdata.Name ||
      !fdata.Email ||
      !fdata.Phone ||
      !fdata.Password ||
      !fdata.ConPassword
    ) {
      Alert.alert("All fields are required");
      return;
    }

    if (fdata.Password !== fdata.ConPassword) {
      Alert.alert("Password and confirm password must be the same");
      return;
    }

    try {
      let res = await axios.post(`http://192.168.209.10:8080/demo/user`, {
        ...fdata,
      });
      Alert.alert(res.data);
      setFdata({
        Name: "",
        Email: "",
        Phone: "",
        Password: "",
        ConPassword: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      if (error.response.status >= 400 && 499 >= error.response.status) {
        Alert.alert(error.response.data);
      } else {
        Alert.alert("Something Wrong / Network Error");
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[0.5] overflow-hidden rounded-b-3xl">
        <ImageBackground
          source={secOneBg}
          className="flex-1 justify-center items-center"
        >
          <View className="absolute inset-0 bg-black/40" />
          <Text className="text-white text-2xl font-bold mb-5">
            Welcome Back! 
          </Text>
        </ImageBackground>
      </View>
      <ScrollView className="flex-1 bg-white px-7 mt-5 rounded-t-3xl">
        <Text className="text-black text-lg font-semibold mb-2">Name</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Enter the Name"
          onChangeText={(text) => setFdata({ ...fdata, Name: text })}
        />
        <Text className="text-black text-lg font-semibold mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Enter the Email"
          onChangeText={(text) => setFdata({ ...fdata, Email: text })}
        />
        <Text className="text-black text-lg font-semibold mb-2">
          Phone Number
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Enter the Phone Number"
          onChangeText={(text) => setFdata({ ...fdata, Phone: text })}
        />

        <Text className="text-black text-lg font-semibold mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Password"
          onChangeText={(text) => setFdata({ ...fdata, Password: text })}
          secureTextEntry
        />
        <Text className="text-black text-lg font-semibold mb-2">
          Confire Password
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Confire Password"
          onChangeText={(text) => setFdata({ ...fdata, ConPassword: text })}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-green-600 py-4 rounded-xl items-center mb-5"
          onPress={() => {
            HandleRegister();
          }}
        >
          <Text className="text-white text-lg font-bold">Confirm</Text>
        </TouchableOpacity>

        <Text className="text-center text-lg">
          Already have an account?{" "}
          <Text
            className="text-green-600 font-bold"
            onPress={() => navigation.navigate("Login")}
          >
            SIGN IN
          </Text>
        </Text>
      </ScrollView>
      <View></View>
    </View>
  );
}
