import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ProfileSection from "../components/ProfileSection";

import baseStyles from "@/styles/baseStyles";

const ProfileScreen = () => {
  return (
    <View style={baseStyles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <ProfileSection />

    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#37474F",
  },
});

export default ProfileScreen;
