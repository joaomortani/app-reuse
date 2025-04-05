import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import avatarPlaceholder from "../assets/images/avatar-placeholder.png";
import styles from "../styles/styles";

const ProfileSection = () => {
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
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileRole}>Top Seller</Text>
            <Text style={styles.profileBio}>Welcome to my store!</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileSection;
