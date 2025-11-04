export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const FALLBACK_ITEM_IMAGE = "https://placehold.co/600x400?text=Reuse";

export function formatCondition(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = String(value).toUpperCase();
  switch (normalized) {
    case "NEW":
      return "Novo";
    case "LIKE_NEW":
      return "Seminovo";
    case "USED":
      return "Usado";
    default:
      return value;
  }
}

export function parseCoordinate(value?: number | string | null) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistance(origin: Coordinates, destination: Coordinates) {
  const R = 6371; // raio da terra em km
  const dLat = toRadians(destination.latitude - origin.latitude);
  const dLon = toRadians(destination.longitude - origin.longitude);
  const lat1 = toRadians(origin.latitude);
  const lat2 = toRadians(destination.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function formatDistance(distance: number | null) {
  if (!Number.isFinite(distance)) {
    return null;
  }

  if (!distance || distance < 0.05) {
    return "Menos de 50 m";
  }

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1)} km`;
}
