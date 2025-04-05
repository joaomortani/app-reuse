import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6cc634d745dd42d6f124e6604706204c0837a732?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978",
          }}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>ReUse!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginTop: 25,
    flexDirection: "row",
  },
  iconContainer: {
    alignSelf: "stretch",
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    minHeight: 24,
    alignItems: "stretch",
    justifyContent: "center",
    width: 24,
  },
  icon: {
    aspectRatio: 1,
    width: 24,
    flex: 1,
  },
  textContainer: {
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
  },
  text: {
    fontFamily: "Montserrat Alternates",
    fontSize: 64,
    color: "#81C784",
    fontWeight: "800",
  },
});

export default AppLogo;
