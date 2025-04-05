import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import baseStyles from "@/styles/baseStyles";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import ItemsList from "@/components/ItemsList";


const ItemsScreen = () => {
  const navigation = useNavigation();


  const [items, setItems] = useState([
    { id: "1", name: "Item 1", description: "Descrição do Item 1" },
    { id: "2", name: "Item 2", description: "Descrição do Item 2" },
    { id: "3", name: "Item 3", description: "Descrição do Item 3" },
  ]);

  return (
    
    <View style={[baseStyles.container, styles.screenContainer]}>
    <ItemsList items={items} />
    <FAB style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("CreateItem")}>
          Create Item
          </FAB>
      
      
    </View>
  );
};


export default ItemsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // Garante que a tela ocupe todo o espaço disponível
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});