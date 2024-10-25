import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import secOneBg from "../../assets/sec1-bg.png";
import login from"../../assets/login image.jpeg";
import { jwtDecode } from "jwt-decode";

export default function Login({ navigation }) {
  const [fdata, setFdata] = useState({
    Email: "",
    Password: "",
  });
  const [userData, setUserData] = useState([]);
  const [decodeData, setDecodeData] = useState([]);

  const HandleLogin = async () => {
    if (!fdata.Email || !fdata.Password) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      let res = await axios.post(
        `http://192.168.209.10:8080/demo/user/login`,
        {
          ...fdata,
        }
      );
      setUserData(res.data);
      Alert.alert(userData.message);

      let decoded = jwtDecode(userData.token);
      setDecodeData(decoded);

      if (decodeData.role === "admin") {
        navigation.navigate("Adminpanel");
      } else {
        navigation.navigate("Userpanel");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data || "Network Error");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 overflow-hidden rounded-b-3xl">
        <ImageBackground
          source={login}
          className="flex-1 justify-center items-center"
        >
          <View className="absolute inset-0 bg-black/40" />
          <Text className="text-white text-2xl font-bold mb-5">
            Welcome 
          </Text>
        </ImageBackground>
      </View>
      <View className="flex-1 bg-white px-7 mt-10 rounded-t-3xl">
        <Text className="text-black text-lg font-semibold mb-2">
          Email Address
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Enter your email"
          onChangeText={(text) => setFdata({ ...fdata, Email: text })}
        />

        <Text className="text-black text-lg font-semibold mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-xl mb-5"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => setFdata({ ...fdata, Password: text })}
        />

        <View className="flex-row justify-end items-center mb-5">
          <Text className="font-semibold text-black">Forgot Password?</Text>
        </View>

        <TouchableOpacity
          className="bg-green-600 py-4 rounded-xl items-center mb-5"
          onPress={() => {
            HandleLogin();
          }}
        >
          <Text className="text-white text-lg font-bold">LOGIN</Text>
        </TouchableOpacity>

        <Text className="text-center text-lg">
          Don’t have an account?{" "}
          <Text
            className="text-green-600 font-bold"
            onPress={() => navigation.navigate("Register")}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
}
