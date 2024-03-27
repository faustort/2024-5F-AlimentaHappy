import { Image, ScrollView, StyleSheet, View } from "react-native";
import { styles } from "../config/styles";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";

const API_KEY = "77642efe119e4f87ab6643098b3283d8";
const query = "saúde";
const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&language=pt&status=published&sortBy=publishedAt&pageSize=10`;

export default function NoticiasScreen({ navigation }) {
  const [noticias, setNoticias] = useState([]);

  const getNoticias = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNoticias(data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNoticias();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Noticias</Text>
      <ScrollView>
        {noticias.map(
          (noticia, index) =>
            // check if title is [Removed]
            noticia.title !== "[Removed]" && (
              <View style={styles2.card} key={index}>
                <Text style={styles2.title}>{noticia.title}</Text>
                <Text style={styles2.description}>{noticia.description}</Text>
                <Image
                  style={styles2.image}
                  source={{ uri: noticia.urlToImage }}
                />
                <Text style={styles2.url}>{noticia.url}</Text>
              </View>
            )
        )}
      </ScrollView>
    </View>
  );
}

const styles2 = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    marginTop: 10,
  },
  url: {
    fontSize: 12,
    color: "#0645AD",
    marginTop: 10,
  },
});
