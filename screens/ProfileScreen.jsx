import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

import ProfileSection from "../components/ProfileSection";

import baseStyles from "@/styles/baseStyles";
import styles from "@/styles/styles";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={baseStyles.container}>
      <Text style={styles.formTitle}>Profile Screen</Text>
      <ProfileSection />
    </SafeAreaView>
  );
};

export default ProfileScreen;
