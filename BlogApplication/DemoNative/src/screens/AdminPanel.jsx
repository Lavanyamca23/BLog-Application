import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Admin from "./Admin";
import BlogView from "./BlogView";
import CreateBlog from "./CreateBlog";
import Home from "./Home";

const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      activeColor="#080808"
      inactiveColor="#fcfcfc"
      barStyle={{ backgroundColor: "#cccccc", paddingBottom: -5 }}
    >
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-circle-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="e-blog"
        component={Home}
        options={{
          tabBarLabel: "E-Blog",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Blogview"
        component={BlogView}
        options={{
          tabBarLabel: "Blogs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Createblog"
        component={CreateBlog}
        options={{
          tabBarLabel: "CreateBlog",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="creation" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AdminPanel() {
  return <TabNav />;
}
