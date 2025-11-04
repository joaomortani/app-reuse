import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text as RNText } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Portal, Modal, Text, Button } from "react-native-paper";

interface MapProps {
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
  items?: Array<{
    id?: string;
    _id?: string;
    lat?: number | string;
    lng?: number | string;
    title?: string;
    description?: string;
  }>;
  showEmptyModal?: boolean;
  onDismissEmptyModal?: () => void;
}

const Map: React.FC<MapProps> = ({
  userLocation,
  items = [],
  showEmptyModal = false,
  onDismissEmptyModal,
}) => {
  const [modalVisible, setModalVisible] = useState(showEmptyModal);

  useEffect(() => {
    setModalVisible(showEmptyModal);
  }, [showEmptyModal]);

  const markers = useMemo(
    () =>
      items
        .map((item) => {
          const latitude = Number(item?.lat);
          const longitude = Number(item?.lng);

          if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return null;
          }

          return {
            id: item?.id?.toString() || item?._id?.toString() || `${latitude}-${longitude}-${item?.title ?? ""}`,
            latitude,
            longitude,
            title: item?.title || "Item",
            description: item?.description || "",
          };
        })
        .filter(Boolean),
    [items],
  );

  const handleDismiss = () => {
    setModalVisible(false);
    onDismissEmptyModal?.();
  };

  if (!userLocation) {
    return (
      <View style={[styles.container, styles.placeholderContainer]}>
        <RNText style={styles.placeholderTitle}>Ative sua localização</RNText>
        <RNText style={styles.placeholderDescription}>
          Autorize o acesso à sua localização para visualizar o mapa com itens próximos.
        </RNText>
      </View>
    );
  }

  const region = {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={modalVisible && markers.length === 0}
          onDismiss={handleDismiss}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Nenhum item por perto</Text>
          <Text style={styles.modalDescription}>
            Voltaremos a avisar quando itens estiverem disponíveis próximos a você.
          </Text>
          <Button mode="contained" onPress={handleDismiss} style={styles.modalButton}>
            Entendi
          </Button>
        </Modal>
      </Portal>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={region}>
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Você está aqui"
          description="Sua localização atual"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E0F2F1",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#37474F",
    textAlign: "center",
  },
  placeholderDescription: {
    fontSize: 14,
    color: "#607D8B",
    textAlign: "center",
  },
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
