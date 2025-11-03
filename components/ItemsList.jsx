// /components/ItemsList.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Chip, Divider } from "react-native-paper";

const formatCondition = (value) => {
  if (!value) return null;

  const normalized = String(value).toUpperCase();
  switch (normalized) {
    case "NEW":
      return "Novo";
    case "LIKE_NEW":
      return "Seminovo";
    case "USED":
      return "Usado";
    default:
      return value;
  }
};

const formatDateTime = (value) => {
  if (!value) return null;

  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  } catch (error) {
    return value;
  }
};

const ItemsList = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Card key={item.id} style={styles.card}>
          {item?.images?.length ? (
            <Card.Cover source={{ uri: item.images[0] }} style={styles.cover} />
          ) : null}
          <Card.Content>
            <Title>{item.title}</Title>
            {item.category ? (
              <Chip icon="tag" style={styles.chip} compact>
                {item.category}
              </Chip>
            ) : null}
            <Paragraph>{item.description}</Paragraph>
            <View style={styles.metaRow}>
              {item.condition ? (
                <Chip icon="information-outline" style={styles.metaChip} compact>
                  {formatCondition(item.condition)}
                </Chip>
              ) : null}
              {item.status ? (
                <Chip icon="check-circle" style={styles.metaChip} compact>
                  {item.status}
                </Chip>
              ) : null}
            </View>
            <View style={styles.metaColumn}>
              {item.owner?.name ? (
                <Paragraph style={styles.metaText}>Doador: {item.owner.name}</Paragraph>
              ) : null}
              {item.owner?.email ? (
                <Paragraph style={styles.metaText}>Contato: {item.owner.email}</Paragraph>
              ) : null}
              {item.lat !== undefined && item.lat !== null && item.lng !== undefined && item.lng !== null ? (
                <Paragraph style={styles.metaText}>
                  Localização: {typeof item.lat === 'number' ? item.lat.toFixed(4) : item.lat},{' '}
                  {typeof item.lng === 'number' ? item.lng.toFixed(4) : item.lng}
                </Paragraph>
              ) : null}
              {item.createdAt ? (
                <Paragraph style={styles.metaText}>Criado em: {formatDateTime(item.createdAt)}</Paragraph>
              ) : null}
              {item.updatedAt ? (
                <Paragraph style={styles.metaText}>Atualizado em: {formatDateTime(item.updatedAt)}</Paragraph>
              ) : null}
            </View>
          </Card.Content>
          <Divider />
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
  cover: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  metaColumn: {
    marginTop: 12,
    gap: 4,
  },
  metaText: {
    color: "#546E7A",
  },
  chip: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  metaChip: {
    marginRight: 4,
  },
});

export default ItemsList;
