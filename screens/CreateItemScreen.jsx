import React from "react";
import { View } from "react-native";
import baseStyles from "@/styles/baseStyles";
import CreateItemForm from "../components/CreateItemForm";


import BackButton from "../components/BackButton";


const ItemsScreen = () => {
  
  return (
    
    <View style={baseStyles.container}>
    <BackButton />
    <CreateItemForm />
      
      
    </View>
  );
};


export default ItemsScreen;
