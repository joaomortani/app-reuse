import React from "react";
import { View, StyleSheet } from "react-native";
import AppLogo from "../components/AppLogo";
import baseStyles from "@/styles/baseStyles";

import Map from "../components/Map";

const ExploreScreen = () => {
  return (
    <View style={baseStyles.container}>
      <AppLogo />
      <Map />
    </View>
  );
};

export default ExploreScreen;
