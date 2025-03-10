import { StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeInUp,
  SlideInRight,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const buttonBackground = useThemeColor({}, "tint");
  const buttonTextColor = useThemeColor(
    { light: "#fff", dark: "#fff" },
    "text"
  );
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

  return (
    <ThemedView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        style={styles.gradient}
      />

      {/* Decorative Elements */}
      <Animated.View
        entering={FadeIn.delay(300).duration(1200)}
        style={[styles.decorativeCircle, styles.circle1]}
      />
      <Animated.View
        entering={FadeIn.delay(500).duration(1200)}
        style={[styles.decorativeCircle, styles.circle2]}
      />
      <Animated.View
        entering={FadeIn.delay(400).duration(1200)}
        style={[styles.decorativeCircle, styles.circle3]}
      />

      <Animated.ScrollView
        entering={FadeIn.duration(800)}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Title */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.title}>
            Pocket P'tit Bac
          </ThemedText>
          <ThemedText style={styles.tagline}>
            Le jeu du Petit Bac dans votre poche et sans papier 😉!
          </ThemedText>
        </Animated.View>

        {/* Main Card */}
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
            <View style={styles.iconContainer}>
              <IconSymbol
                name="paperplane.fill"
                size={46}
                color={buttonBackground}
                style={styles.cardIcon}
              />
            </View>

            <ThemedText style={styles.welcomeText}>
              Jouez au célèbre jeu du Petit Bac avec vos amis, où que vous soyez
              !
            </ThemedText>

            {/* Action Buttons */}
            <ThemedView style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonBackground }]}
                activeOpacity={0.7}
                onPress={() => {
                  router.push("/(tabs)/create-session");
                }}
              >
                <IconSymbol
                  name="house.fill"
                  size={20}
                  color={buttonTextColor}
                />
                <ThemedText
                  style={styles.buttonText}
                  darkColor="#fff"
                  lightColor="#fff"
                >
                  Créer une session
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonBackground }]}
                activeOpacity={0.7}
                onPress={() => {
                  console.log("Rejoindre une session");
                }}
              >
                <IconSymbol
                  name="paperplane.fill"
                  size={20}
                  color={buttonTextColor}
                />
                <ThemedText
                  style={styles.buttonText}
                  darkColor="#fff"
                  lightColor="#fff"
                >
                  Rejoindre une session
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </Animated.View>

        {/* How to Play Link */}
        <Animated.View entering={FadeInUp.duration(800).delay(600)}>
          <Link href="/explore" style={styles.helpLink}>
            <ThemedText type="link">Comment jouer ?</ThemedText>
          </Link>
        </Animated.View>

        {/* Recent Games Section */}
        <Animated.View
          entering={SlideInRight.duration(800).delay(800)}
          style={styles.recentGamesContainer}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Parties récentes
          </ThemedText>
          <ThemedView
            style={[
              styles.emptyState,
              { backgroundColor: cardBackground, borderColor },
            ]}
          >
            <IconSymbol
              name="chevron.left.forwardslash.chevron.right"
              size={36}
              color="#808080"
            />
            <ThemedText style={styles.emptyStateText}>
              Aucune partie récente
            </ThemedText>
          </ThemedView>
        </Animated.View>
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
  decorativeCircle: {
    position: "absolute",
    borderRadius: 300,
    opacity: 0.5,
  },
  circle1: {
    width: 220,
    height: 220,
    backgroundColor: "#A1CEDC",
    top: -60,
    right: -60,
  },
  circle2: {
    width: 180,
    height: 180,
    backgroundColor: "#0a7ea4",
    opacity: 0.2,
    top: width * 0.5,
    left: -90,
  },
  circle3: {
    width: 140,
    height: 140,
    backgroundColor: "#0a7ea4",
    opacity: 0.15,
    bottom: 80,
    right: -40,
  },
  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 17,
    marginTop: 8,
    opacity: 0.8,
    textAlign: "center",
  },
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 10,
  },
  card: {
    padding: 28,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1,
    backdropFilter: "blur(10px)",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(10, 126, 164, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  cardIcon: {
    opacity: 0.9,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    gap: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  helpLink: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 36,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  recentGamesContainer: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 6,
    fontSize: 22,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    borderRadius: 20,
    gap: 14,
    borderWidth: 1,
    backdropFilter: "blur(10px)",
  },
  emptyStateText: {
    color: "#808080",
    fontSize: 16,
    opacity: 0.9,
  },
});
