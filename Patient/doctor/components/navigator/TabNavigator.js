import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack, ProfileStack } from "./StackNavigator";
import Wallet from "../screens/Wallet";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../account/Splash";
import Login from "../account/Login";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Chats from "../screens/Chats";
import Chat from "../screens/Chat";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = ({ route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        initialParams={route}
      />
    </Stack.Navigator>
  );
};

const ChatStack = ({ route }) => {
  const { params } = route;
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        animation: "ios",
        contentStyle: {
          backgroundColor: "#f8f8f8",
        },
      }}
    >
      <Stack.Screen name="Chat" component={Chats} initialParams={params} />
      <Stack.Screen name="Messages" component={Chat} initialParams={params} />
    </Stack.Navigator>
  );
};

const TabNavigator = ({ route }) => {
  const { params } = route;
  // console.log("Tabs navigator params ", params);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "#a2adb7",
        headerTransparent: true,
      }}
      sceneContainerStyle={{ backgroundColor: "#f8f8f8" }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              color={focused ? "teal" : "#a2adb7"}
              size={18}
            />
          ),

          tabBarStyle: { display: focusedRouteName(route) },
          tabBarLabelStyle: {
            fontFamily: "MontserratMedium",
          },
        })}
        name="Home"
        component={HomeStack}
        initialParams={params}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="wallet-outline"
              color={focused ? "teal" : "#a2adb7"}
              size={18}
            />
          ),
          tabBarStyle: { display: focusedRouteName(route) },
          tabBarLabelStyle: {
            fontFamily: "MontserratMedium",
          },
        })}
        name="Wallet"
        component={Wallet}
        initialParams={params}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={focused ? "teal" : "#a2adb7"}
              size={18}
            />
          ),
          tabBarStyle: { display: focusedRouteName(route) },
          tabBarLabelStyle: {
            fontFamily: "MontserratMedium",
          },
        })}
        name="Chats"
        component={ChatStack}
        initialParams={params}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              color={focused ? "teal" : "#a2adb7"}
              size={18}
            />
          ),
          tabBarStyle: { display: focusedRouteName(route) },
          tabBarLabelStyle: {
            fontFamily: "MontserratMedium",
          },
        })}
        name="Profile"
        component={ProfileStack}
        initialParams={params}
      />
    </Tab.Navigator>
  );
};

const focusedRouteName = (route) => {
  const route_name = getFocusedRouteNameFromRoute(route);
  console.log(route_name);
  if (
    route_name &&
    (route_name.includes("ViewArticle") ||
      route_name.includes("PublishBlog") ||
      route_name.includes("Notifications") ||
      route_name.includes("Messages") ||
      route_name.includes("PublishArticle"))
  ) {
    return "none";
  }
  return "flex";
};

export { TabNavigator, TabStack, ChatStack };
