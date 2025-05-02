
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ imageUrl, showArrow = false }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Title</Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>
            {imageUrl ===
            "https://cdn.builder.io/api/v1/image/assets/TEMP/64ae27a947f3ce3614abea08aa5f9c925d00bf4d?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978"
              ? "Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse."
              : "Id eros pellentesque facilisi id mollis faucibus commodo enim."}
          </Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>More Info</Text>
          </View>
          {showArrow && (
            <Image
              source={{
                uri:
                  imageUrl ===
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/64ae27a947f3ce3614abea08aa5f9c925d00bf4d?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978"
                    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/c8da40212b911686c56feb4a81e7ae26beb8a7f8?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978"
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/7cd8b81fbf92a1d01a7eb058fc0ee87cfd003bf4?placeholderIfAbsent=true&apiKey=fb692f04ed564c8f8e039ab5d2a25978",
              }}
              style={styles.buttonIcon}
            />
          )}
        </View>
      </View>
    </View>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  image: {
    aspectRatio: 0.75,
    width: "100%",
    minHeight: 220,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 16,
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
    marginTop: 16,
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
  },
  button: {
    minHeight: 48,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  buttonTextContainer: {
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 14,
    color: "#0F62FE",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  buttonIcon: {
    aspectRatio: 1,
    width: 24,
    alignSelf: "stretch",
  },
});

export default ProductCard;