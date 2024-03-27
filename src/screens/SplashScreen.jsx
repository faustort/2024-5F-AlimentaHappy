import { View } from "react-native";
import LogoApp from "../components/LogoApp";
import { useEffect } from "react";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("TabNavigator");
    }, 500);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LogoApp />
    </View>
  );
}
