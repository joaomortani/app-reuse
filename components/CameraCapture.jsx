// /components/CameraCapture.jsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera, useCameraPermissions } from "expo-camera";

const CameraCapture = () => {
  const [permissionResponse, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permissionResponse) {
      requestPermission();
    }
  }, [permissionResponse]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  if (!permissionResponse) {
    return (
      <View style={styles.messageContainer}>
        <Text>Solicitando permissão para acessar a câmera...</Text>
      </View>
    );
  }
  if (permissionResponse.status !== "granted") {
    return (
      <View style={styles.messageContainer}>
        <Text>Sem acesso à câmera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Text style={styles.buttonText}>Capturar</Text>
        </TouchableOpacity>
      </View>
      {capturedPhoto && (
        <View style={styles.preview}>
          <Text>Foto Capturada:</Text>
          <Image source={{ uri: capturedPhoto }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default CameraCapture;