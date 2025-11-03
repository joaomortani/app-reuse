import React from "react";
import { View, Text, ScrollView } from "react-native";
import AppLogo from "../components/AppLogo";
import CategoryItem from "../components/CategoryItem";
import TopItems from "../components/TopItem";
import baseStyles from "@/styles/baseStyles";
import styles from "@/styles/styles";

const HomeScreen = () => {
  const categories = ["Electronics", "Furniture", "Clothing", "Books", "Miscellaneous"];
  const halfIndex = Math.ceil(categories.length / 2);
  const firstRow = categories.slice(0, halfIndex);
  const secondRow = categories.slice(halfIndex);

  return (
    <View style={baseStyles.container}>
      <ScrollView contentContainerStyle={[styles.mainContent, { paddingTop: 24 }]}>
        <AppLogo />
        <Text style={styles.formTitle}>Explorar</Text>

        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            {firstRow.map((label, index) => (
              <CategoryItem key={index} label={label} />
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
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

export default HomeScreen;
