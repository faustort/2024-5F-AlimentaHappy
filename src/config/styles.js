import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: "auto",
    paddingHorizontal: 20,
    maxWidth: 768,
    width: "100%",
  },
  alignSelfStretch: {
    alignSelf: "stretch",
  },
  spaceBellow: {
    marginBottom: 20,
  },
  spaceTop: {
    marginTop: 20,
  },
});
