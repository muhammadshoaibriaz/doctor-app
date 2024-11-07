import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookedAppointments from "../doctors/BookedAppointments";
import Chat from "../doctors/chat";
import FavoriteDoc from "../doctors/FavoriteDoc";
import MyDoctors from "../doctors/MyDoctors";
import SearchDoc from "../doctors/SearchDoc";
import CustomDrawer from "../screens/CustomDrawer";
import Faq from "../screens/Faq";
import Help from "../screens/Help";
import Payment from "../doctors/payment";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Specialist from "../screens/Specialist";
import EditProfile from "../userprofile/editProfile";
import Profile from "../userprofile/profile";
import PatientName from "../doctors/PatientName";
import DocDetails from "../doctors/docDetails";
import CreateAccount from "../../SelectionScreen";
import Login from "../account/Login";
import MPin from "../account/MPin";
import ForgotPassword from "../account/ForgotPassword";
import Hospital from "../hospitals/Hospital";
import HosDetails from "../hospitals/HosDetails";
import VideoCall from "../videocall/VideoCall";
import AudioCall from "../videocall/AudioCall";
import MedicalRecord from "../userprofile/medicalRecord";
import Signup from "../account/SignUp";
import Splash from "../screens/Splash";
import AllSpecialist from "../doctors/specialist/AllSpecialist";
import Fever from "../screens/pages/Fever";
import PickImage from "../account/PickImage";
import WebViews from "../screens/WebView";
import Blogs from "../blogs/Blogs";
import ViewArticle from "../blogs/ViewArticle";
import Calculator from "../screens/Calculator";
import Onboarding from "../onboarding/onboarding";
import SelectionScreen from "../../SelectionScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Switch = createNativeStackNavigator();

const HomeStack = ({ route }) => {
  const { params } = route;
  // console.log("home stack params", params);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Home" component={Home} initialParams={params} />
      <Stack.Screen name="WebViews" component={WebViews} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen
        name="AudioCall"
        component={AudioCall}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen name="Profile" component={Profile} initialParams={params} />
      <Stack.Screen name="Specialist" component={Specialist} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="AllSpecialist" component={AllSpecialist} />
      <Stack.Screen name="FavoriteDoc" component={FavoriteDoc} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={params}
      />
      <Stack.Screen name="DocDetails" component={DocDetails} />
      <Stack.Screen name="PatientName" component={PatientName} />
      <Stack.Screen name="Payment" component={Payment} initialParams={params} />
      <Stack.Screen
        name="MedicalRecord"
        component={MedicalRecord}
        initialParams={params}
      />
      <Stack.Screen
        name="BookedAppointments"
        component={BookedAppointments}
        initialParams={params}
      />
      <Stack.Screen
        name="SearchDoc"
        component={SearchDoc}
        options={{
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        initialParams={params}
      />
      <Stack.Screen name="Fever" component={Fever} />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ route }) => {
  // console.log("profile stack", route.params);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="FavoriteDoc" component={FavoriteDoc} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="DocDetails" component={DocDetails} />
    </Stack.Navigator>
  );
};

const ViewHospital = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
      initialRouteName="Hospital"
    >
      <Stack.Screen name="Hospital" component={Hospital} />
      <Stack.Screen name="HosDetails" component={HosDetails} />
    </Stack.Navigator>
  );
};
const ArticleStack = ({ route }) => {
  const { params } = route;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
      initialRouteName="Blogs"
    >
      <Stack.Screen name="Blogs" component={Blogs} initialParams={params} />
      <Stack.Screen name="ViewArticle" component={ViewArticle} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = ({ route }) => {
  // console.log("Drawer params data ", route.params);
  const { params } = route;
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#f9f9f9" },
      }}
      drawerContent={(props) => (
        <CustomDrawer route={route.params} {...props} />
      )}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        initialParams={route.params}
      />
      <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}
        {...route.params}
      />
      <Drawer.Screen name="MyDoctors" component={MyDoctors} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="SearchDoc" component={SearchDoc} />
      <Drawer.Screen name="ViewHospital" component={ViewHospital} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="Blog" component={ArticleStack} />
      <Drawer.Screen name="Calculator" component={Calculator} />
      <Drawer.Screen name="WebView" component={WebViews} />
      <Drawer.Screen
        name="BookedAppointments"
        component={BookedAppointments}
        initialParams={params}
      />
    </Drawer.Navigator>
  );
};

// These are important navigators

const PatientNavigator = ({ route }) => {
  return (
    <Switch.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
    >
      <Switch.Screen name="Splash" component={Splash} />
      <Switch.Screen name="SignUp" component={Signup} />
      <Switch.Screen name="MPin" component={MPin} />
      <Switch.Screen name="PickImage" component={PickImage} />
      <Switch.Screen name="ForgotPassword" component={ForgotPassword} />
      <Switch.Screen name="Login" component={Login} />
      <Switch.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Switch.Navigator>
  );
};

const OnboardingNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#f8f8f8",
        },
        animation: "ios",
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const PatientNavigators = ({ route }) => {
  return (
    <Switch.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9f9f9" },
        animation: "ios",
      }}
    >
      <Switch.Screen name="Onboarding" component={Onboarding} />
      <Switch.Screen name="SignUp" component={Signup} />
      <Switch.Screen name="MPin" component={MPin} />
      <Switch.Screen name="PickImage" component={PickImage} />
      <Switch.Screen name="ForgotPassword" component={ForgotPassword} />
      <Switch.Screen name="Login" component={Login} />
      <Switch.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Switch.Navigator>
  );
};

export {
  HomeStack,
  ProfileStack,
  PatientNavigator,
  DrawerNavigator,
  PatientNavigators,
  OnboardingNav,
};
