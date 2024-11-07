import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllArticles from "../screens/AllArticles";
import ViewArticle from "../screens/ViewArticle";
import PostBlogs from "../screens/PostBlogs";
import PostArticle from "../screens/PostArticle";
import Home from "../account/Home";
import MyProfile from "../screens/MyProfile";
import Chat from "../screens/Chat";
import Notifications from "../screens/Notifications";
import PatientDetails from "../screens/PatientDetails";
const Stack = createNativeStackNavigator();

const HomeStack = ({ route }) => {
  const { params } = route;
  // console.log("profile stack params", params);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
    >
      <Stack.Screen name="HomePage" component={Home} initialParams={params} />
      <Stack.Screen
        name="PublishArticle"
        options={{
          animation: "fade_from_bottom",
        }}
        component={PostArticle}
        initialParams={params}
      />
      <Stack.Screen
        name="PublishBlog"
        options={{
          animation: "fade_from_bottom",
        }}
        initialParams={params}
        component={PostBlogs}
      />
      <Stack.Screen
        name="AllArticles"
        component={AllArticles}
        initialParams={params}
      />
      <Stack.Screen
        name="ViewArticle"
        component={ViewArticle}
        initialParams={params}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = ({ route }) => {
  const { params } = route;
  // console.log("profile stack params", params);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
      initialRouteName="MyProfile"
    >
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        initialParams={params}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        initialParams={params}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetails}
        initialParams={params}
      />
      {/* <Stack.Screen name="Messages" component={Chat} initialParams={params} /> */}
    </Stack.Navigator>
  );
};

export { HomeStack, ProfileStack };
