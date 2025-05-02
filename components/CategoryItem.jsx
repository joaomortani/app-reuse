import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryItem = ({ label }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.circle} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 13,
    alignItems: "center",
    flexDirection: "column",
  },
  circle: {
    borderColor: "rgba(46, 125, 50, 0.6)",
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