import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import Admin from "./src/screens/Admin";
import AdminPanel from "./src/screens/AdminPanel";
import NewsViewer from "./src/Components/NewsViewer";
import Search from "./src/Components/Search";
import UserPanel from "./src/screens/UserPanel";
import ViewCard from "./src/Components/ViewCard";
import DetailsScreen from "./src/screens/DetailsScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Adminpanel" component={AdminPanel} />
        <Stack.Screen name="Userpanel" component={UserPanel} />
        <Stack.Screen name="NewsViewer" component={NewsViewer} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Viewcard" component={ViewCard} />
        <Stack.Screen name="Detailscreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// initialRouteName="Splash"
