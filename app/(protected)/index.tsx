import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { router } from "expo-router";

import AppLogo from "@/components/AppLogo";
import baseStyles from "@/styles/baseStyles";
import globalStyles from "@/styles/styles";
import TopItems from "@/components/TopItem";
import Map from "@/components/Map";
import EmptyState from "@/components/EmptyState";
import { getItems, getNearbyItems } from "@/services/itemService";
import { useAuth } from "@/auth/AuthContext";
import { getCategories, type Category } from "@/services/categoryService";
import {
  FALLBACK_ITEM_IMAGE,
  calculateDistance,
  formatCondition,
  formatDistance,
  parseCoordinate,
  type Coordinates,
} from "@/utils/itemHelpers";

const PUBLIC_ITEMS_LIMIT = 10;
type Item = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  images?: string[];
  condition?: string;
  categoryId?: string | null;
  category?:
    | string
    | {
        id?: string;
        name?: string;
        description?: string | null;
      }
    | null;
  lat?: number | string;
  lng?: number | string;
  owner?: {
    name?: string;
    email?: string;
  };
};

function ExploreRoute() {
  const { userToken } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [publicItems, setPublicItems] = useState<Item[]>([]);
  const [publicPage, setPublicPage] = useState(1);
  const [publicHasMore, setPublicHasMore] = useState(true);
  const [publicLoading, setPublicLoading] = useState(true);
  const [publicLoadingMore, setPublicLoadingMore] = useState(false);
  const [publicError, setPublicError] = useState("");

  const [nearbyItems, setNearbyItems] = useState<Item[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyError, setNearbyError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [showNearbyEmptyModal, setShowNearbyEmptyModal] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError("");
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      setCategories([]);
      setCategoriesError("Não foi possível carregar as categorias.");
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const fetchPublicItems = useCallback(
    async (pageToLoad: number = 1) => {
      if (pageToLoad === 1) {
        setPublicLoading(true);
        setPublicError("");
      } else {
        setPublicLoadingMore(true);
      }

      try {
        const data = await getItems(pageToLoad, PUBLIC_ITEMS_LIMIT);
        const nextItems = Array.isArray(data.items) ? data.items : [];

        setPublicItems((prev) => (pageToLoad === 1 ? nextItems : [...prev, ...nextItems]));
        setPublicPage(data.page);
        setPublicHasMore(data.page < data.totalPages);
      } catch (error) {
        console.error("Erro ao listar itens públicos:", error);
        if (pageToLoad === 1) {
          setPublicItems([]);
          setPublicError("Não foi possível carregar os itens públicos.");
        }
      } finally {
        if (pageToLoad === 1) {
          setPublicLoading(false);
        } else {
          setPublicLoadingMore(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!selectedCategoryId) {
      return;
    }

    const exists = categories.some((category) => category.id === selectedCategoryId);
    if (!exists) {
      setSelectedCategoryId(null);
    }
  }, [categories, selectedCategoryId]);

  useEffect(() => {
    fetchPublicItems(1);
  }, [fetchPublicItems]);

  const fetchNearby = useCallback(
    async (coords: Coordinates) => {
      try {
        setNearbyError("");
        const data = await getNearbyItems(coords.latitude, coords.longitude, 2, userToken || undefined);
        const normalized = Array.isArray(data) ? data : [];
        setNearbyItems(normalized);
        setShowNearbyEmptyModal(normalized.length === 0);
      } catch (error) {
        console.error("Erro ao buscar itens próximos:", error);
        setNearbyItems([]);
        setShowNearbyEmptyModal(false);
        setNearbyError("Não foi possível carregar os itens próximos.");
      }
    },
    [userToken],
  );

  const requestLocation = useCallback(async () => {
    setNearbyLoading(true);
    setLocationError("");

    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setUserLocation(null);
        setNearbyItems([]);
        setShowNearbyEmptyModal(false);
        setLocationError(
          "Precisamos da sua permissão de localização para mostrar itens que estão perto de você.",
        );
        return;
      }

      const currentPosition = await getCurrentPositionAsync();
      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      setUserLocation(coords);
      await fetchNearby(coords);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setUserLocation(null);
      setNearbyItems([]);
      setShowNearbyEmptyModal(false);
      setNearbyError("Não foi possível obter sua localização.");
    } finally {
      setNearbyLoading(false);
    }
  }, [fetchNearby]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleLoadMorePublic = useCallback(() => {
    if (!publicHasMore || publicLoadingMore) {
      return;
    }

    fetchPublicItems(publicPage + 1);
  }, [fetchPublicItems, publicHasMore, publicLoadingMore, publicPage]);

  const handleNavigateToItem = useCallback((item: Item) => {
    const itemId = item?.id ?? item?._id;
    if (!itemId) {
      return;
    }

    router.push({ pathname: "/item/[id]", params: { id: String(itemId) } });
  }, []);

  const nearbyList = useMemo(() => nearbyItems.slice(0, 6), [nearbyItems]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) || null,
    [categories, selectedCategoryId],
  );

  const publicList = useMemo(() => {
    if (!selectedCategoryId) {
      return publicItems;
    }

    return publicItems.filter((item) => {
      const itemCategoryId = item?.categoryId ??
        (typeof item?.category === "object" && item?.category?.id ? String(item.category.id) : null);

      if (itemCategoryId) {
        return String(itemCategoryId) === selectedCategoryId;
      }

      const itemCategoryName =
        typeof item?.category === "string"
          ? item.category
          : typeof item?.category === "object"
            ? item?.category?.name
            : null;

      if (!itemCategoryName || !selectedCategory?.name) {
        return false;
      }

      return itemCategoryName.trim().toLowerCase() === selectedCategory.name.trim().toLowerCase();
    });
  }, [publicItems, selectedCategoryId, selectedCategory]);

  const renderItemCard = useCallback(
    (item: Item, options?: { showDistance?: boolean }) => {
      const imageSource = item.images?.[0] || FALLBACK_ITEM_IMAGE;
      const parsedLat = parseCoordinate(item.lat);
      const parsedLng = parseCoordinate(item.lng);

      const categoryLabel =
        typeof item.category === "string"
          ? item.category
          : typeof item.category === "object" && item.category
            ? item.category.name ?? null
            : null;

      let distanceLabel: string | null = null;
      if (options?.showDistance && userLocation && parsedLat !== null && parsedLng !== null) {
        const distance = calculateDistance(userLocation, { latitude: parsedLat, longitude: parsedLng });
        distanceLabel = formatDistance(distance);
      }

      return (
        <Pressable
          key={item.id || item._id}
          style={localStyles.itemCard}
          onPress={() => handleNavigateToItem(item)}
        >
          <Image source={{ uri: imageSource }} style={localStyles.itemImage} />
          <View style={localStyles.itemContent}>
            <Text style={localStyles.itemTitle}>{item.title}</Text>
            {categoryLabel ? (
              <View style={localStyles.itemTagRow}>
                <Text style={localStyles.itemTag}>{categoryLabel}</Text>
              </View>
            ) : null}
            <Text style={localStyles.itemDescription} numberOfLines={2}>
              {item.description || "Sem descrição disponível."}
            </Text>
            <View style={localStyles.itemMetaRow}>
              {item.condition ? (
                <Text style={localStyles.itemMeta}>{formatCondition(item.condition)}</Text>
              ) : null}
              {distanceLabel ? <Text style={localStyles.itemMeta}>{distanceLabel}</Text> : null}
            </View>
            {item.owner?.name ? (
              <Text style={localStyles.itemOwner}>Doador: {item.owner.name}</Text>
            ) : null}
          </View>
        </Pressable>
      );
    },
    [handleNavigateToItem, userLocation],
  );

  return (
    <SafeAreaView style={baseStyles.container}>
      <ScrollView contentContainerStyle={[globalStyles.mainContent, localStyles.content]}>
        <AppLogo />
        <Text style={globalStyles.formTitle}>Explorar</Text>

        <View style={localStyles.categoriesSection}>
          <View style={localStyles.sectionHeader}>
            <Text style={localStyles.sectionTitle}>Categorias</Text>
            <Button mode="text" onPress={loadCategories} disabled={categoriesLoading} compact>
              Atualizar
            </Button>
          </View>
          {categoriesLoading ? (
            <ActivityIndicator size="small" style={localStyles.sectionLoader} />
          ) : null}
          {!categoriesLoading && categoriesError ? (
            <Text style={localStyles.sectionError}>{categoriesError}</Text>
          ) : null}
          {!categoriesLoading && !categoriesError ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.categoryList}
            >
              <Pressable
                key="all"
                style={[
                  localStyles.categoryPill,
                  !selectedCategoryId ? localStyles.categoryPillSelected : null,
                ]}
                onPress={() => setSelectedCategoryId(null)}
              >
                <Text
                  style={[
                    localStyles.categoryPillText,
                    !selectedCategoryId ? localStyles.categoryPillTextSelected : null,
                  ]}
                >
                  Todas
                </Text>
              </Pressable>
              {categories.map((category) => {
                const isSelected = selectedCategoryId === category.id;
                return (
                  <Pressable
                    key={category.id}
                    style={[
                      localStyles.categoryPill,
                      isSelected ? localStyles.categoryPillSelected : null,
                    ]}
                    onPress={() =>
                      setSelectedCategoryId((current) =>
                        current === category.id ? null : category.id,
                      )
                    }
                  >
                    <Text
                      style={[
                        localStyles.categoryPillText,
                        isSelected ? localStyles.categoryPillTextSelected : null,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : null}
        </View>

        <TopItems onItemPress={handleNavigateToItem} />

        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Itens próximos</Text>
          <View style={localStyles.mapContainer}>
            <Map
              userLocation={userLocation}
              items={nearbyItems}
              showEmptyModal={showNearbyEmptyModal}
              onDismissEmptyModal={() => setShowNearbyEmptyModal(false)}
            />
          </View>

          {nearbyLoading ? (
            <ActivityIndicator size="large" style={localStyles.sectionLoader} />
          ) : null}

          {!nearbyLoading && locationError ? (
            <EmptyState
              title="Ative sua localização"
              description={locationError}
              actionLabel="Tentar novamente"
              onActionPress={requestLocation}
            />
          ) : null}

          {!nearbyLoading && !locationError && nearbyError ? (
            <EmptyState
              title="Algo deu errado"
              description={nearbyError}
              actionLabel="Tentar novamente"
              onActionPress={requestLocation}
            />
          ) : null}

          {!nearbyLoading && !locationError && !nearbyError && nearbyList.length === 0 ? (
            <EmptyState
              title="Nenhum item por perto"
              description="Ainda não encontramos doações próximas. Continue explorando a lista pública!"
            />
          ) : null}

          {!nearbyLoading && !locationError && !nearbyError && nearbyList.length > 0 ? (
            <View style={localStyles.itemsList}>
              {nearbyList.map((item) => renderItemCard(item, { showDistance: true }))}
            </View>
          ) : null}
        </View>

        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Itens públicos</Text>

          {publicLoading && publicItems.length === 0 ? (
            <ActivityIndicator size="large" style={localStyles.sectionLoader} />
          ) : null}

          {!publicLoading && publicError ? (
            <EmptyState
              title="Não foi possível carregar"
              description={publicError}
              actionLabel="Tentar novamente"
              onActionPress={() => fetchPublicItems(1)}
            />
          ) : null}

          {!publicLoading && !publicError && publicList.length === 0 ? (
            <EmptyState
              title="Nenhum item disponível"
              description="Ainda não há itens públicos cadastrados. Volte em breve para conferir as novidades."
            />
          ) : null}

          {!publicLoading && !publicError && publicList.length > 0 ? (
            <View style={localStyles.itemsList}>
              {publicList.map((item) => renderItemCard(item))}
            </View>
          ) : null}

          {publicHasMore && !publicLoading && !publicError ? (
            <Button
              mode="outlined"
              onPress={handleLoadMorePublic}
              loading={publicLoadingMore}
              style={localStyles.loadMoreButton}
            >
              Carregar mais
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  content: {
    paddingBottom: 48,
  },
  categoriesSection: {
    marginTop: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    marginTop: 32,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#263238",
  },
  sectionError: {
    color: "#D32F2F",
    fontSize: 12,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionLoader: {
    marginTop: 16,
  },
  categoryList: {
    alignItems: "center",
    paddingRight: 8,
    gap: 8,
  },
  categoryPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C5E1A5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },
  categoryPillSelected: {
    backgroundColor: "#1B5E20",
    borderColor: "#1B5E20",
  },
  categoryPillText: {
    color: "#1B5E20",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryPillTextSelected: {
    color: "#FFFFFF",
  },
  itemsList: {
    gap: 16,
  },
  itemCard: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CFD8DC",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemImage: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: "#ECEFF1",
  },
  itemContent: {
    flex: 1,
    gap: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263238",
  },
  itemTagRow: {
    flexDirection: "row",
  },
  itemTag: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    color: "#1B5E20",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  itemDescription: {
    fontSize: 14,
    color: "#607D8B",
  },
  itemMetaRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  itemMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
  },
  itemOwner: {
    fontSize: 12,
    color: "#455A64",
  },
  loadMoreButton: {
    alignSelf: "center",
    marginTop: 8,
  },
});

export default ExploreRoute;
