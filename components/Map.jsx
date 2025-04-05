import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

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
      if (location) {
        setMarkers([
          {
            id: "1",
            latitude: location.coords.latitude + 0.001,
            longitude: location.coords.longitude + 0.001,
            title: "Item 1",
            description: "Descrição do item 1",
          },
          {
            id: "2",
            latitude: location.coords.latitude - 0.001,
            longitude: location.coords.longitude - 0.001,
            title: "Item 2",
            description: "Descrição do item 2",
          },
          {
            id: "3",
            latitude: location.coords.latitude + 0.002,
            longitude: location.coords.longitude - 0.001,
            title: "Item 3",
            description: "Descrição do item 3",
          },
        ]);
      }
    }, [location]);
  
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