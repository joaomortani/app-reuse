import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ProductCard from "./ProductCard";
import { getTopItems } from "@/services/itemService";

const TopItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const data = await getTopItems();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar top itens:", err);
        // Não quebrar a tela se a API falhar, apenas mostrar lista vazia
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top Itens</Text>
        </View>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top Itens</Text>
        </View>
        <Text style={styles.emptyText}>Nenhum item encontrado</Text>
      </View>
    );
  }

  // Dividir itens em grupos de 2 para exibição em linhas
  const firstRow = items.slice(0, 2);
  const secondRow = items.slice(2, 4);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Top Itens</Text>
      </View>

      <View style={styles.frame}>
        {firstRow.length > 0 && (
          <View style={styles.row}>
            <View style={styles.cardsContainer}>
              {firstRow.map((item, index) => (
                <ProductCard
                  key={item.id || item._id || index}
                  imageUrl={item.images?.[0] || "https://via.placeholder.com/150"}
                  title={item.title}
                  description={item.description}
                  showArrow={true}
                />
              ))}
            </View>
          </View>
        )}

        {secondRow.length > 0 && (
          <View style={styles.row}>
            <View style={styles.cardsContainer}>
              {secondRow.map((item, index) => (
                <ProductCard
                  key={item.id || item._id || index + 2}
                  imageUrl={item.images?.[0] || "https://via.placeholder.com/150"}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </View>
          </View>
        )}
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
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 20,
  },
});

export default TopItems;
