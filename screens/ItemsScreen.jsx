import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import baseStyles from "@/styles/baseStyles";
import styles from "@/styles/styles";
import { FAB } from "react-native-paper";
import ItemsList from "@/components/ItemsList";
import { router } from "expo-router";
import { useAuth } from "@/auth/AuthContext";
import { getItems } from "@/services/itemService";

const ItemsScreen = () => {
  const [items, setItems] = useState([]);
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems(userToken);
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      }
    };

    fetchItems();
  }, [userToken]);

  return (
    <SafeAreaView style={[baseStyles.container, styles.scrollContainer]}>
      <ScrollView contentContainerStyle={[styles.mainContent, { paddingVertical: 24 }]}>
        <Text style={styles.formTitle}>Meus Itens</Text>
        <ItemsList items={items || []} />
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