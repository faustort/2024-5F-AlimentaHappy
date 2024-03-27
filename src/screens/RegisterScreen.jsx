import { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import LogoApp from "../components/LogoApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleRegister() {
    setLoading(true);
    try {
      const usuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await setDoc(
        // cria uma nova entrada no banco de dados

        doc(db, "usuarios", usuario.user.uid), // define a id do documento
        {
          email,
          name,
        }
      );
      //
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LogoApp />
        <Text variant="headlineMedium">Register</Text>
        <TextInput
          style={styles.alignSelfStretch}
          label="Nome"
          value={name}
          onChangeText={setName}
        />
        <Divider style={{ marginVertical: 5 }} />
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
        <Divider style={{ marginVertical: 5 }} />
        <Button mode="contained" onPress={handleRegister} loading={loading}>
          Cadastrar
        </Button>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Já tem uma conta? Faça login
        </Button>
      </View>
    </View>
  );
}
