import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import { useState } from "react";
import LogoApp from "../components/LogoApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin() {
    setLoading(true);
    try {
      //   navigation.navigate("HomeScreen");
      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (user) navigation.navigate("AccountScreen");
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LogoApp />
        <Text style={{ marginVertical: 10 }} variant="headlineMedium">
          Faça seu Login
        </Text>
        <TextInput
          style={styles.alignSelfStretch}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Divider style={{ marginVertical: 5 }} />

        <TextInput
          style={styles.alignSelfStretch}
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          style={styles.spaceTop}
          mode="contained"
          onPress={handleLogin}
          loading={loading}
        >
          Entrar
        </Button>
        <Button onPress={() => navigation.navigate("RecoveryScreen")}>
          Esqueceu sua senha?
        </Button>
        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          Não tem uma conta? Cadastre-se
        </Button>
      </View>
    </View>
  );
}
