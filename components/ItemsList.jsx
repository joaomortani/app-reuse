// /components/ItemsList.jsx
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { List } from "react-native-paper";

const ItemsList = ({ items }) => {
  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.description}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80, 
  },
});

export default ItemsList;