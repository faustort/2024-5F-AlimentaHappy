import { Button, Text } from "react-native-paper";
import { View } from "react-native-web";
import { styles } from "./../config/styles";
import { useEffect, useState } from "react";
import { auth } from "./../config/firebase";
import { db } from "./../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function AccountScreen({ navigation }) {
  const [usuario, setUsario] = useState(null);

  const getUser = async () => {
    try {
      // check if user is logged in
      auth.onAuthStateChanged((user) => {
        if (user) {
          // get user data from firestore collection usuarios
          const userRef = doc(db, "usuarios", user.uid);
          getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
              setUsario(docSnap.data());
              console.log("Document data:", docSnap.data());
            } else {
              console.log("Usuário não encontrado");
              navigation.navigate("LoginScreen");
            }
          });
        } else {
          navigation.navigate("LoginScreen");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loggout = () => {
    signOut(auth).then(() => {
      navigation.navigate("LoginScreen");
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View styles={styles.container}>
      <View styles={styles.innerContainer}>
        <Text variant="headlineMedium">Sua conta</Text>
        <Text>Bem vind(a) {usuario?.name}</Text>
        <Button onPress={loggout}>Sair</Button>
        
      </View>
    </View>
  );
}
