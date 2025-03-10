import { StyleSheet, TouchableOpacity, Switch, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useThemeContext } from "@/hooks/useThemeContext";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const { isDarkMode, setDarkMode } = useThemeContext();

  const cardBackground = useThemeColor(
    { light: "rgba(255,255,255,0.85)", dark: "rgba(30,36,47,0.85)" },
    "background"
  );
  const borderColor = useThemeColor(
    { light: "rgba(228,231,235,0.5)", dark: "rgba(45,55,72,0.5)" },
    "background"
  );
  const gradientStart = useThemeColor(
    { light: "#A1CEDC", dark: "#162836" },
    "background"
  );
  const gradientEnd = useThemeColor(
    { light: "#E4F1F6", dark: "#1D2129" },
    "background"
  );
  const iconColor = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        style={styles.gradient}
      />

      <Animated.ScrollView
        entering={FadeIn.duration(800)}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.title}>
            Paramètres
          </ThemedText>
        </Animated.View>

        {/* Appearance Settings */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(300)}
          style={styles.cardWrapper}
        >
          <ThemedView
            style={[
              styles.card,
              { backgroundColor: cardBackground, borderColor },
            ]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol name="moon.fill" size={22} color={iconColor} />
                <ThemedText style={styles.settingText}>Mode sombre</ThemedText>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#767577", true: "#0a7ea4" }}
                thumbColor={"#f4f3f4"}
              />
            </View>
          </ThemedView>
        </Animated.View>

        {/* Settings Group */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.cardWrapper}
        >
          <ThemedView
            style={[
              styles.card,
              { backgroundColor: cardBackground, borderColor },
            ]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol name="bell.fill" size={22} color={iconColor} />
                <ThemedText style={styles.settingText}>
                  Notifications
                </ThemedText>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#767577", true: "#0a7ea4" }}
                thumbColor={"#f4f3f4"}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  name="speaker.wave.2.fill"
                  size={22}
                  color={iconColor}
                />
                <ThemedText style={styles.settingText}>
                  Effets sonores
                </ThemedText>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: "#767577", true: "#0a7ea4" }}
                thumbColor={"#f4f3f4"}
              />
            </View>
          </ThemedView>
        </Animated.View>

        {/* About Section */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(600)}
          style={styles.cardWrapper}
        >
          <ThemedView
            style={[
              styles.card,
              { backgroundColor: cardBackground, borderColor },
            ]}
          >
            <TouchableOpacity style={styles.settingButton}>
              <View style={styles.settingInfo}>
                <IconSymbol
                  name="info.circle.fill"
                  size={22}
                  color={iconColor}
                />
                <ThemedText style={styles.settingText}>À propos</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#808080" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingButton}>
              <View style={styles.settingInfo}>
                <IconSymbol name="envelope.fill" size={22} color={iconColor} />
                <ThemedText style={styles.settingText}>
                  Contacter le support
                </ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#808080" />
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>

        <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  cardWrapper: {
    marginBottom: 24,
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Add elevation for Android
    elevation: 5,
  },
  card: {
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    backdropFilter: "blur(10px)",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 17,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150,150,150,0.2)",
    marginHorizontal: 16,
  },
  versionText: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.6,
    marginTop: 20,
  },
});
