import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../config/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Bem vindx</Text>
    </View>
  );
}
