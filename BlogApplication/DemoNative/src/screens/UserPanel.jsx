import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./Home";
import BlogView from "./BlogView";

const Tab = createMaterialBottomTabNavigator();

const UserTabNav = () => {
  return (
    <Tab.Navigator
      activeColor="#080808"
      inactiveColor="#fcfcfc"
      barStyle={{ backgroundColor: "#cccccc", paddingBottom: -5 }}
    >
      <Tab.Screen
        name="e-blog"
        component={Home}
        options={{
          tabBarLabel: "E-Blog",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={25} />
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
    </Tab.Navigator>
  );
};

export default function UserPanel() {
  return <UserTabNav />;
}
