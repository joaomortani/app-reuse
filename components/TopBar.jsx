import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TopBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <View style={styles.valueContainer}>
            <Text>Value</Text>
          </View>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f3c470a3af93891b9c1b98ebc56f1c0799dcf9b?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978",
            }}
            style={styles.searchIcon}
          />
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa26fee6347016f12ead58db57ed24d5ccd513de?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978",
          }}
          style={styles.menuIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 23,
    backgroundColor: "#00796B",
    width: "100%",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 37,
    paddingBottom: 37,
    justifyContent: "center",
  },
  content: {
    display: "flex",
    width: "100%",
    maxWidth: 284,
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchBar: {
    borderRadius: 9999,
    borderColor: "rgba(217, 217, 217, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    minHeight: 36,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
    flexDirection: "row",
    flex: 1,
  },
  valueContainer: {
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
    width: 160,
  },
  searchIcon: {
    aspectRatio: 1,
    width: 16,
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
  },
  menuIcon: {
    aspectRatio: 1,
    width: 24,
    marginTop: "auto",
    marginBottom: "auto",
  },
});

export default TopBar;
