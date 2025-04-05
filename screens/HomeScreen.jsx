import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TopBar from "../components/TopBar";
import AppLogo from "../components/AppLogo";
import CategoryItem from "../components/CategoryItem";
import TopItems from "../components/TopItem";
import baseStyles from "@/styles/baseStyles";

const ExploreScreen = () => {
  const categories = ["Electronics", "Furniture", "Clothing", "Books", "Miscellaneous"];
  const halfIndex = Math.ceil(categories.length / 2);
  const firstRow = categories.slice(0, halfIndex);
  const secondRow = categories.slice(halfIndex);

  return (
    <View style={baseStyles.container}>
      <ScrollView>
        <AppLogo />
        <Text style={styles.text}>Explore Screen</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.row}>
            {firstRow.map((label, index) => (
              <CategoryItem key={index} label={label} />
            ))}
          </View>
          <View style={styles.row}>
            {secondRow.map((label, index) => (
              <CategoryItem key={index} label={label} />
            ))}
          </View>
        </View>
        <TopItems />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#37474F",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default ExploreScreen;
