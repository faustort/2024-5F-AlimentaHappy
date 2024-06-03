import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RecoveryPassword from "../screens/RecoveryPassword";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";
import NoticiasScreen from "../screens/NoticiasScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createNativeStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RecoveryScreen" component={RecoveryPassword} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: "home",
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Saúde",
          tabBarIcon: "heart-pulse",
        }}
        name="NoticiasScreen"
        component={NoticiasScreen}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Conta",
          tabBarIcon: "account",
        }}
        name="AccountNavigator"
        component={AccountNavigator}
      />
    </Tabs.Navigator>
  );
};
