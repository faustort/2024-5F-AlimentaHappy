import { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import LogoApp from "../components/LogoApp";

export default function RecoveryPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleRecoveryPassword() {
    setLoading(true);
    try {
      navigation.navigate("LoginScreen");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LogoApp />
        <Text>Recuperar senha</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            ...styles.alignSelfStretch,
            ...styles.spaceTop,
            ...styles.spaceBellow,
          }} // uso de spread operator
        />
        <Divider style={{ marginVertical: 5 }} />

        <Button
          mode="contained"
          onPress={handleRecoveryPassword}
          loading={loading}
        >
          Recuperar
        </Button>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Já tem uma conta? Faça login
        </Button>
      </View>
    </View>
  );
}
