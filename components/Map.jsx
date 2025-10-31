import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { useAuth } from "@/auth/AuthContext";
import { getItems } from "@/services/itemService";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
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
    if (!location || !userToken) {
      return;
    }

    let isSubscribed = true;

    const fetchMarkers = async () => {
      try {
        const data = await getItems(userToken);
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
          {/* Markers para os itens próximos */}
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

export default Map;