import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

const TopItems = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Top Itens</Text>
      </View>

      <View style={styles.frame}>
        <View style={styles.row}>
          <View style={styles.cardsContainer}>
            <ProductCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/64ae27a947f3ce3614abea08aa5f9c925d00bf4d?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978"
              showArrow={true}
            />
            <ProductCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/4067729467b8b685c7f7e6e0ea93d13516d00a97?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978"
              showArrow={true}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.cardsContainer}>
            <ProductCard imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/64ae27a947f3ce3614abea08aa5f9c925d00bf4d?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978" />
            <ProductCard imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/4067729467b8b685c7f7e6e0ea93d13516d00a97?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 57,
    paddingHorizontal: 21,
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 14,
  },
  title: {
    color: "#000",
    fontFamily: "Montserrat",
    fontSize: 36,
    fontWeight: "700",
  },
  frame: {
    fontFamily: "Roboto",
  },
  row: {
    width: "100%",
    maxWidth: 361,
    marginBottom: 9,
  },
  cardsContainer: {
    display: "flex",
    width: "100%",
    gap: 8,
    flexDirection: "row",
  },
});

export default TopItems;
