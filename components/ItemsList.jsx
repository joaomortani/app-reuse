// /components/ItemsList.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const ItemsList = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});

export default ItemsList;