import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Haptics from "expo-haptics";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const buttonBackground = useThemeColor({}, "tint");
  const isDark = colorScheme === "dark";

  // Animation simple
  const scale = useSharedValue(1);

  const handleCreatePress = () => {
    // Feedback haptique
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animation simple
    scale.value = withTiming(0.9, { duration: 100 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 100 });
    }, 100);

    // Navigation
    router.push("/(tabs)/create-session");
  };

  // Style animé simple
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              height: 85,
              borderTopWidth: 0,
            },
            android: {
              height: 65,
              backgroundColor: isDark ? "#162836" : "#E4F1F6",
              borderTopWidth: 0,
              elevation: 8,
            },
            default: {},
          }),
          tabBarShowLabel: false,
          tabBarItemStyle: {
            marginHorizontal: 15,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create-session"
          options={{
            title: "Create",
            tabBarIcon: () => null,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Paramètres",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="gearshape.fill" color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Bouton flottant simple */}
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[
          styles.floatingButtonContainer,
          Platform.OS === "ios" ? { bottom: 60 } : { bottom: 40 },
        ]}
      >
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            style={[
              styles.floatingButton,
              { backgroundColor: buttonBackground },
            ]}
            onPress={handleCreatePress}
            activeOpacity={0.8}
          >
            <IconSymbol
              name="plus"
              size={24}
              color="#FFFFFF"
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 999,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
