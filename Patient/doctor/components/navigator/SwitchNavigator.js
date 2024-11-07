import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import Availability from "../account/Availability";
import Service from "../account/Service";
import UploadDoc from "../account/UploadDoc";
import Profile from "../account/profile";
import Signup from "../account/SignUp";
import Login from "../account/Login";
import MPin from "../account/MPin";
import Splash from "../account/Splash";

const Switch = createNativeStackNavigator();

const SwitchNavigator = ({ route }) => {
  return (
    <Switch.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
        animation: "ios",
      }}
    >
      <Switch.Screen name="Splash" component={Splash} />
      <Switch.Screen name="MPin" component={MPin} />
      <Switch.Screen name="Login" component={Login} />
      <Switch.Screen name="SignUp" component={Signup} />
      <Switch.Screen name="Profile" component={Profile} />
      <Switch.Screen name="UploadDoc" component={UploadDoc} />
      <Switch.Screen name="Service" component={Service} />
      <Switch.Screen name="Availability" component={Availability} />
      <Switch.Screen name="Tabs" component={TabNavigator} />
    </Switch.Navigator>
  );
};

export { SwitchNavigator };
