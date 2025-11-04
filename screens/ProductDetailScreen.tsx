import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";

import AppLogo from "@/components/AppLogo";
import baseStyles from "@/styles/baseStyles";
import globalStyles from "@/styles/styles";
import EmptyState from "@/components/EmptyState";
import { getItemById } from "@/services/itemService";
import {
  FALLBACK_ITEM_IMAGE,
  formatCondition,
  parseCoordinate,
  type Coordinates,
} from "@/utils/itemHelpers";

interface ItemDetail {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  images?: string[];
  condition?: string;
  status?: string;
  categoryId?: string | null;
  category?:
    | string
    | {
        id?: string;
        name?: string;
        description?: string | null;
      }
    | null;
  lat?: number | string | null;
  lng?: number | string | null;
  owner?: {
    name?: string;
    email?: string;
  };
}

const formatLocation = (coords: Coordinates | null) => {
  if (!coords) {
    return null;
  }

  return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
};

const ProductDetailScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const itemId = useMemo(() => {
    if (!params?.id) {
      return null;
    }

    return Array.isArray(params.id) ? params.id[0] : params.id;
  }, [params]);

  const [item, setItem] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItem = useCallback(async () => {
    if (!itemId) {
      setItem(null);
      setError("Item não encontrado.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getItemById(itemId);
      setItem(data ?? null);
      if (!data) {
        setError("Item não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao carregar item:", err);
      setItem(null);
      setError("Não foi possível carregar os detalhes deste item.");
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const conditionLabel = formatCondition(item?.condition);
  const locationCoords: Coordinates | null = useMemo(() => {
    if (!item) {
      return null;
    }

    const lat = parseCoordinate(item.lat);
    const lng = parseCoordinate(item.lng);

    if (lat === null || lng === null) {
      return null;
    }

    return { latitude: lat, longitude: lng };
  }, [item]);

  const coverImage = item?.images?.[0] || FALLBACK_ITEM_IMAGE;
  const canTrade = Boolean(item?.owner?.email);
  const categoryLabel = useMemo(() => {
    if (!item?.category) {
      return null;
    }

    if (typeof item.category === "string") {
      return item.category;
    }

    if (typeof item.category === "object") {
      return item.category?.name ?? null;
    }

    return null;
  }, [item?.category]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  const handleTrade = useCallback(() => {
    if (!item?.owner?.email) {
      return;
    }

    const subject = encodeURIComponent(`Interesse em trocar: ${item?.title ?? "Item"}`);
    const mailtoUrl = `mailto:${item.owner.email}?subject=${subject}`;
    Linking.openURL(mailtoUrl).catch((err) => {
      console.error("Erro ao abrir e-mail:", err);
    });
  }, [item]);

  if (loading) {
    return (
      <SafeAreaView style={baseStyles.container}>
        <View style={localStyles.centered}>
          <ActivityIndicator size="large" color="#1B5E20" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={baseStyles.container}>
        <ScrollView contentContainerStyle={[globalStyles.mainContent, localStyles.content]}>
          <AppLogo />
          <Button mode="text" icon="arrow-left" onPress={handleGoBack} style={localStyles.backButton}>
            Voltar
          </Button>
          <EmptyState
            title="Não foi possível carregar o item"
            description={error}
            actionLabel="Voltar"
            onActionPress={handleGoBack}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={baseStyles.container}>
        <ScrollView contentContainerStyle={[globalStyles.mainContent, localStyles.content]}>
          <AppLogo />
          <Button mode="text" icon="arrow-left" onPress={handleGoBack} style={localStyles.backButton}>
            Voltar
          </Button>
          <EmptyState
            title="Item não encontrado"
            description="O item que você está procurando pode ter sido removido ou não está mais disponível."
            actionLabel="Voltar"
            onActionPress={handleGoBack}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const locationLabel = formatLocation(locationCoords);

  return (
    <SafeAreaView style={baseStyles.container}>
      <ScrollView contentContainerStyle={[globalStyles.mainContent, localStyles.content]}>
        <AppLogo />
        <Button mode="text" icon="arrow-left" onPress={handleGoBack} style={localStyles.backButton}>
          Voltar
        </Button>

        <View style={localStyles.heroImageContainer}>
          <Image source={{ uri: coverImage }} style={localStyles.heroImage} />
        </View>

        <View style={localStyles.header}>
          <Text style={localStyles.title}>{item.title}</Text>
          <View style={localStyles.tagsRow}>
            {conditionLabel ? (
              <Chip icon="information-outline" style={localStyles.chip} textStyle={localStyles.chipText}>
                {conditionLabel}
              </Chip>
            ) : null}
            {item.status ? (
              <Chip icon="check-circle-outline" style={localStyles.chip} textStyle={localStyles.chipText}>
                {item.status}
              </Chip>
            ) : null}
            {categoryLabel ? (
              <Chip icon="tag" style={localStyles.chip} textStyle={localStyles.chipText}>
                {categoryLabel}
              </Chip>
            ) : null}
          </View>
        </View>

        <Text style={localStyles.description}>{item.description || "Sem descrição disponível."}</Text>

        <View style={localStyles.sectionCard}>
          <Text style={localStyles.sectionTitle}>Informações de contato</Text>
          {item.owner?.name ? <Text style={localStyles.sectionText}>Doador: {item.owner.name}</Text> : null}
          {item.owner?.email ? (
            <Text style={localStyles.sectionText}>E-mail: {item.owner.email}</Text>
          ) : (
            <Text style={localStyles.sectionSubtle}>
              Nenhuma informação de contato disponível no momento.
            </Text>
          )}
        </View>

        <View style={localStyles.sectionCard}>
          <Text style={localStyles.sectionTitle}>Localização</Text>
          {locationLabel ? (
            <Text style={localStyles.sectionText}>{locationLabel}</Text>
          ) : (
            <Text style={localStyles.sectionSubtle}>
              A localização exata deste item não foi informada.
            </Text>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleTrade}
          disabled={!canTrade}
          style={localStyles.tradeButton}
          labelStyle={localStyles.tradeButtonLabel}
        >
          Trocar
        </Button>
        {!canTrade ? (
          <Text style={localStyles.tradeHelperText}>
            Entre em contato com o doador para combinar a troca assim que os dados forem disponibilizados.
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  content: {
    paddingBottom: 48,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  heroImageContainer: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ECEFF1",
  },
  heroImage: {
    width: "100%",
    height: 240,
  },
  header: {
    marginTop: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B5E20",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#E8F5E9",
  },
  chipText: {
    color: "#2E7D32",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#455A64",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#CFD8DC",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#263238",
  },
  sectionText: {
    fontSize: 14,
    color: "#37474F",
  },
  sectionSubtle: {
    fontSize: 14,
    color: "#78909C",
  },
  tradeButton: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 4,
  },
  tradeButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  tradeHelperText: {
    marginTop: 8,
    fontSize: 13,
    color: "#607D8B",
    textAlign: "center",
  },
});

export default ProductDetailScreen;
