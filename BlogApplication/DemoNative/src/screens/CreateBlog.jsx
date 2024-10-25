import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function CreateBlog() {
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [loader, setLoader] = useState(false);

  let date = new Date();
  let formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  let formattedTime = date.toLocaleTimeString("en-US");

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await convertToBase64(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Could not pick the image. Please try again.");
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileType = uri.split(".").pop();
      const prefix =
        fileType === "jpg" || fileType === "jpeg"
          ? "data:image/jpeg;base64,"
          : "data:image/png;base64,";

      setBase64Image(`${prefix}${base64}`);
      Alert.alert("Success", "Image uploaded successfully!");
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not convert image to Base64. Please try again."
      );
    }
  };

  const handleCreate = async () => {
    if (
      !imageUri ||
      !title ||
      !description ||
      !content ||
      !author ||
      !selectedValue
    ) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      setLoader(true);
      const res = await axios.post(`http://192.168.209.10:8080/demo/blog`, {
        Image: base64Image,
        Title: title,
        Description: description,
        Content: content,
        Category: selectedValue,
        Author: author,
        CreatedAt: `${formattedDate.replace(" ", " ")} ${formattedTime}`,
      });
      setLoader(false);

      Alert.alert("New Blog", res.data);
      resetForm();
    } catch (error) {
      const message =
        error.response?.status >= 400 && error.response?.status <= 599
          ? error.response.data
          : "Something went wrong. Please try again.";
      Alert.alert("Error", message);
    }
  };

  const resetForm = () => {
    setImageUri(null);
    setBase64Image(null);
    setTitle("");
    setDescription("");
    setContent("");
    setSelectedValue("");
    setAuthor("");
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-black text-3xl font-semibold mt-10">
        Create New Blog
      </Text>
      <ScrollView className="w-full space-y-2">
        <View>
          <Text className="text-black text-lg font-semibold ">Title</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base"
            placeholder="Enter blog title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View>
          <Text className="text-black text-lg font-semibold ">Description</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base"
            placeholder="Enter a short description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View>
          <Text className="text-black text-lg font-semibold ">Content</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base"
            placeholder="Write your blog content"
            // multiline={true}
            // numberOfLines={4}
            value={content}
            onChangeText={setContent}
          />
        </View>
        <View className="flex-1 bg-gray-100">
          <Text className="text-lg font-semibold text-gray-800">
            Select a language:
          </Text>
          <View className="w-full border border-gray-300 rounded-md overflow-hidden py-1">
            <Picker
              selectedValue={selectedValue}
              style={{ width: "100%", height: 50 }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Sports" value="sports" />
              <Picker.Item label="Business" value="business" />
              <Picker.Item label="Entertainment" value="entertainment" />
              <Picker.Item label="Health" value="health" />
              <Picker.Item label="Science" value="science" />
              <Picker.Item label="Technology" value="technology" />
              
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-black text-lg font-semibold ">Author</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base"
            placeholder="Enter author name"
            value={author}
            onChangeText={setAuthor}
          />
        </View>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-[25vh] rounded-lg my-4 mx-auto"
          />
        )}
        <TouchableOpacity
          className={`${
            imageUri ? "bg-red-600" : "bg-green-600"
          } py-4 rounded-lg items-center mb-4 w-[90%] mx-auto`}
          onPress={() => {
            if (imageUri) {
              setImageUri(null);
            }
            pickImage();
          }}
        >
          <Text className="text-white text-lg font-bold">
            {imageUri ? "Change Image" : "Pick an Image"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-lg mx-auto items-center  w-[90%]"
        onPress={() => handleCreate()}
      >
        <View>
          {loader ? (
            <Text className="text-white text-lg font-bold">Processing...</Text>
          ) : (
            <Text className="text-white text-lg font-bold">Create Blog</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
