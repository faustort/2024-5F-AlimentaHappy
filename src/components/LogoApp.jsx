import { Image } from "expo-image";

export default function LogoApp() {
  return (
    <Image
      source={require("../../assets/alimenta-happy.png")}
      style={{ width: 300, height: 300 }}
      contentFit="contain"
    />
  );
}
