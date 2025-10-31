import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/auth/AuthContext";
import avatarPlaceholder from "../assets/images/avatar-placeholder.png";
import styles from "../styles/styles";

const ProfileSection = () => {
  const { user, signOut, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  useEffect(() => {
    setFormValues({
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
  }, [user]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues({
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser({
        name: formValues.name.trim() || undefined,
        email: formValues.email.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileContent}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={avatarPlaceholder}
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>
              {user?.name || "Visitante"}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || "E-mail não informado"}
            </Text>
            <Text style={styles.profileBio}>
              Gerencie seus dados de perfil quando quiser.
            </Text>
          </View>
        </View>

        {isEditing ? (
          <View style={localStyles.editContainer}>
            <View style={localStyles.editField}>
              <Text style={styles.fieldLabel}>Nome</Text>
              <TextInput
                value={formValues.name}
                onChangeText={(value) =>
                  setFormValues((prev) => ({ ...prev, name: value }))
                }
                style={[styles.textInput, localStyles.editInput]}
                placeholder="Nome completo"
              />
            </View>
            <View style={localStyles.editField}>
              <Text style={styles.fieldLabel}>E-mail</Text>
              <TextInput
                value={formValues.email}
                onChangeText={(value) =>
                  setFormValues((prev) => ({ ...prev, email: value }))
                }
                style={[styles.textInput, localStyles.editInput]}
                placeholder="email@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.profileActions}>
              <TouchableOpacity
                style={[styles.editProfileButton, localStyles.secondaryButton]}
                onPress={handleCancelEdit}
              >
                <Text style={[styles.editProfileButtonText, localStyles.secondaryButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.editProfileButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileActions}>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleStartEdit}
            >
              <Text style={styles.editProfileButtonText}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editProfileButton, localStyles.signOutButton]}
              onPress={signOut}
            >
              <Text
                style={[styles.editProfileButtonText, localStyles.signOutButtonText]}
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  editContainer: {
    width: "100%",
    gap: 16,
  },
  editField: {
    gap: 8,
  },
  editInput: {
    height: 48,
  },
  secondaryButton: {
    backgroundColor: "#ECEFF1",
  },
  secondaryButtonText: {
    color: "#455A64",
  },
  signOutButton: {
    backgroundColor: "#FFEBEE",
  },
  signOutButtonText: {
    color: "#C62828",
  },
});

export default ProfileSection;
