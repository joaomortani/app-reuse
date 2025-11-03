import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { Portal, Modal, Text, Button } from "react-native-paper";

import { useAuth } from "@/auth/AuthContext";
import { getNearbyItems } from "@/services/itemService";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showNoItemsModal, setShowNoItemsModal] = useState(false);
  const { userToken } = useAuth();

  async function requestLocationPermission() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }

    let isSubscribed = true;

    const fetchMarkers = async () => {
      try {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        const data = await getNearbyItems(lat, lng, 2, userToken);
        if (!isSubscribed) {
          return;
        }

        const formattedMarkers = (Array.isArray(data) ? data : [])
          .map((item) => {
            const latitude = Number(item?.lat);
            const longitude = Number(item?.lng);

            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
              return null;
            }

            return {
              id:
                item?.id?.toString() ||
                item?._id?.toString() ||
                `${latitude}-${longitude}-${item?.title ?? ""}`,
              latitude,
              longitude,
              title: item?.title || "Item",
              description: item?.description || "",
            };
          })
          .filter(Boolean);

        setMarkers(formattedMarkers);
        setShowNoItemsModal(formattedMarkers.length === 0);
      } catch (error) {
        console.error("Erro ao carregar itens no mapa:", error);
      }
    };

    fetchMarkers();

    return () => {
      isSubscribed = false;
    };
  }, [location, userToken]);

  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <Modal
          visible={showNoItemsModal}
          onDismiss={() => setShowNoItemsModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Nenhum item por perto</Text>
          <Text style={styles.modalDescription}>
            Voltaremos a avisar quando itens estiverem disponíveis próximos a você.
          </Text>
          <Button mode="contained" onPress={() => setShowNoItemsModal(false)} style={styles.modalButton}>
            Entendi
          </Button>
        </Modal>
      </Portal>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
            description="Sua localização atual"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  modalButton: {
    alignSelf: "stretch",
  },
});

export default Map;
