// This file provides a unified interface for using icons across platforms

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Icon library types for easy access
export type IconLibrary =
  | "material"
  | "fontawesome"
  | "fontawesome5"
  | "ionicons"
  | "antdesign"
  | "entypo"
  | "feather";

// Define the mapping from SF Symbol to various icon libraries
const MAPPING = {
  // Original Material icons mapping
  "house.fill": { library: "material", name: "home" },
  "paperplane.fill": { library: "material", name: "send" },
  "chevron.left.forwardslash.chevron.right": {
    library: "material",
    name: "code",
  },
  "chevron.right": { library: "material", name: "chevron-right" },
  "gearshape.fill": { library: "material", name: "settings" },
  "moon.fill": { library: "material", name: "dark-mode" },
  "bell.fill": { library: "material", name: "notifications" },
  "speaker.wave.2.fill": { library: "material", name: "volume-up" },
  "info.circle.fill": { library: "material", name: "info" },
  "envelope.fill": { library: "material", name: "email" },

  // Additional icons from various libraries
  "heart.fill": { library: "fontawesome", name: "heart" },
  "star.fill": { library: "fontawesome", name: "star" },
  calendar: { library: "fontawesome5", name: "calendar-alt" },
  "person.fill": { library: "ionicons", name: "person" },
  "cart.fill": { library: "antdesign", name: "shoppingcart" },
  "chat.bubble.fill": { library: "entypo", name: "chat" },
  search: { library: "feather", name: "search" },
  plus: { library: "material", name: "add" },
  "plus.circle.fill": { library: "antdesign", name: "pluscircle" },
  "plus.square.fill": { library: "feather", name: "plus-square" },
  checkmark: { library: "ionicons", name: "checkmark" },
  xmark: { library: "ionicons", name: "close" },
  pencil: { library: "feather", name: "edit" },
  trash: { library: "feather", name: "trash-2" },
  "lock.fill": { library: "material", name: "lock" },
  globe: { library: "fontawesome5", name: "globe" },
  "bell.badge.fill": { library: "material", name: "notifications-active" },
  "rectangle.and.pencil.and.ellipsis": { library: "material", name: "create" },
  "square.and.pencil": { library: "ionicons", name: "create-outline" },
  "pencil.and.outline": { library: "feather", name: "edit-2" },
  "doc.badge.plus": { library: "material", name: "note-add" },
  "doc.plaintext": { library: "material", name: "description" },
  "plus.diamond": { library: "antdesign", name: "plussquareo" },
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses multiple icon libraries including MaterialIcons, FontAwesome, Ionicons, etc.
 * This provides access to thousands of icons across different libraries.
 *
 * Icon `name`s are based on SFSymbols and mapped to the appropriate icon library.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const iconMapping = MAPPING[name];

  if (!iconMapping) {
    console.warn(`Icon "${name}" not found in mapping`);
    return null;
  }

  switch (iconMapping.library) {
    case "material":
      return (
        <MaterialIcons
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "fontawesome":
      return (
        <FontAwesome
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "fontawesome5":
      return (
        <FontAwesome5
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "ionicons":
      return (
        <Ionicons
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "antdesign":
      return (
        <AntDesign
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "entypo":
      return (
        <Entypo
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    case "feather":
      return (
        <Feather
          name={iconMapping.name}
          size={size}
          color={color}
          style={style}
        />
      );
    default:
      return (
        <MaterialIcons name="error" size={size} color={color} style={style} />
      );
  }
}

// Helper function to directly use icons from any library without mapping
export function DirectIcon({
  library = "material",
  name,
  size = 24,
  color,
  style,
}: {
  library: IconLibrary;
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  switch (library) {
    case "material":
      return (
        <MaterialIcons
          name={name as any}
          size={size}
          color={color}
          style={style}
        />
      );
    case "fontawesome":
      return (
        <FontAwesome
          name={name as any}
          size={size}
          color={color}
          style={style}
        />
      );
    case "fontawesome5":
      return (
        <FontAwesome5
          name={name as any}
          size={size}
          color={color}
          style={style}
        />
      );
    case "ionicons":
      return (
        <Ionicons name={name as any} size={size} color={color} style={style} />
      );
    case "antdesign":
      return (
        <AntDesign name={name as any} size={size} color={color} style={style} />
      );
    case "entypo":
      return (
        <Entypo name={name as any} size={size} color={color} style={style} />
      );
    case "feather":
      return (
        <Feather name={name as any} size={size} color={color} style={style} />
      );
    default:
      return (
        <MaterialIcons name="error" size={size} color={color} style={style} />
      );
  }
}
