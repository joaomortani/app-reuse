import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoryItem = ({ label }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.circle} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,              // distribuição igual na linha
    marginHorizontal: 5,  // espaçamento entre itens
    marginTop: 13,
    alignItems: "center",
    flexDirection: "column", // mudar de row para column para posicionar abaixo
  },
  circle: {
    strokeWidth: 1,
    borderColor: "rgba(85, 107, 47, 1)",
    borderStyle: "dashed",
    borderWidth: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: 50,
    width: 62,
    height: 62,
  },
  label: {
    fontFamily: "Lato",
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    marginTop: 4,
  },
});

export default CategoryItem;
