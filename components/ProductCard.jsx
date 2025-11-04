import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ProductCard = ({
  imageUrl,
  title,
  description,
  showArrow = false,
  onPress,
  actionLabel = "Ver detalhes",
}) => {
  const displayTitle = title || "Title";
  const displayDescription = description || "Sem descrição disponível.";
  const displayImage = imageUrl || "https://placehold.co/600x400?text=Reuse";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}
    >
      <Image source={{ uri: displayImage }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{displayTitle}</Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>{displayDescription}</Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
        {showArrow ? <MaterialIcons name="arrow-forward" size={20} color="#0F62FE" /> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#DDE1E6",
    backgroundColor: "#FFF",
    flex: 1,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.92,
  },
  image: {
    aspectRatio: 0.75,
    width: "100%",
    minHeight: 220,
  },
  content: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 16,
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
    color: "#21272A",
  },
  paragraphContainer: {
    marginTop: 0,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#21272A",
  },
  buttonGroup: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    minHeight: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#0F62FE",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});

export default ProductCard;
