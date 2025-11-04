import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import { getTopItems } from "@/services/itemService";

const TopItems = ({ onItemPress }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTopItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTopItems();
      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar top itens:", err);
      setItems([]);
      setError("Não foi possível carregar os itens em destaque.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopItems();
  }, [fetchTopItems]);

  const handlePress = useCallback(
    (item) => {
      if (!item) {
        return;
      }

      onItemPress?.(item);
    },
    [onItemPress],
  );

  const displayedItems = useMemo(() => items.slice(0, 4), [items]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Itens em destaque</Text>
        </View>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Itens em destaque</Text>
        </View>
        <EmptyState
          title="Algo deu errado"
          description={error}
          actionLabel="Tentar novamente"
          onActionPress={fetchTopItems}
        />
      </View>
    );
  }

  if (displayedItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Itens em destaque</Text>
        </View>
        <EmptyState
          title="Nenhum item em destaque"
          description="Assim que novos itens forem adicionados, eles aparecerão aqui."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Itens em destaque</Text>
      </View>

      <View style={styles.cardsWrapper}>
        {displayedItems.map((item) => (
          <ProductCard
            key={item.id || item._id}
            imageUrl={item.images?.[0]}
            title={item.title}
            description={item.description}
            showArrow
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: "#000",
    fontFamily: "Montserrat",
    fontSize: 24,
    fontWeight: "700",
  },
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  loader: {
    marginVertical: 24,
  },
});

export default TopItems;
