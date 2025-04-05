import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import CameraCapture from "./CameraCapture";

const CategoryButton = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, selected && styles.selectedCategoryButton]}
      onPress={onPress}
    >
      <Text style={styles.categoryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ConditionButton = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.conditionButton,
        selected && styles.selectedConditionButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.conditionButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const CreateItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const categories = ["Electronics", "Clothing", "Books", "Home Appliances"];
  const conditions = ["New", "Like New", "Used"];

  return (
    <ScrollView>
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Create a New Item</Text>
      <Text style={styles.formSubtitle}>Fill in the details below</Text>

      <View style={styles.formContent}>
        <View style={styles.uploadSection}>
          <View style={styles.uploadPreview}>
            {showCamera ? <CameraCapture /> : <Ionicons name="image-outline" size={48} color="#9ca3af" />}
          </View>
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
              <Ionicons name="camera-outline" size={24} color="#374151" />
              <Text style={styles.cameraButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
          {showCamera && (
            <TouchableOpacity style={styles.closeCameraButton} onPress={() => setShowCamera(false)}>
              <Text style={styles.closeCameraButtonText}>Fechar Câmera</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.formFields}>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Item Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter the item name"
              maxLength={200}
              value={itemName}
              onChangeText={setItemName}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Describe the item"
              maxLength={200}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {categories.map((category, index) => (
                <CategoryButton
                  key={index}
                  title={category}
                  selected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Condition</Text>
            <View style={styles.conditionsContainer}>
              {conditions.map((condition, index) => (
                <ConditionButton
                  key={index}
                  title={condition}
                  selected={selectedCondition === condition}
                  onPress={() => setSelectedCondition(condition)}
                />
              ))}
            </View>
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default CreateItemForm;
