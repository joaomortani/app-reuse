import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import baseStyles from "@/styles/baseStyles";
import styles from "@/styles/styles";
import { FAB } from "react-native-paper";
import ItemsList from "@/components/ItemsList";
import { router } from "expo-router";

const ItemsScreen = () => {
  const [items, setItems] = useState([
    { id: "1", name: "Item 1", description: "Descrição do Item 1" },
    { id: "2", name: "Item 2", description: "Descrição do Item 2" },
    { id: "3", name: "Item 3", description: "Descrição do Item 3" },
  ]);

  return (
    <SafeAreaView style={[baseStyles.container, styles.scrollContainer]}>
      <ScrollView contentContainerStyle={[styles.mainContent, { paddingVertical: 24 }]}>
        <Text style={styles.formTitle}>Meus Itens</Text>
        <ItemsList items={items} />
      </ScrollView>
      <FAB
        style={localStyles.fab}
        icon="plus"
        onPress={() => router.push("/item/create-item")}
      >
        Create Item
      </FAB>
    </SafeAreaView>
  );
};

export default ItemsScreen;

const localStyles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});