import {
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeInDown,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  interpolate,
  withSequence,
  withDelay,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function CreateSessionScreen() {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("4");
  const [gameCode, setGameCode] = useState(generateRandomCode(6));
  const [isCodeRefreshed, setIsCodeRefreshed] = useState(false);

  const backButtonScale = useSharedValue(1);
  const createButtonScale = useSharedValue(1);
  const refreshButtonRotation = useSharedValue(0);
  const titleScale = useSharedValue(1);
  const iconFloat = useSharedValue(0);
  const playerButtonsScale = useSharedValue(1);

  useEffect(() => {
    iconFloat.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );

    titleScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );

    playerButtonsScale.value = withSequence(
      withTiming(1.05, { duration: 300 }),
      withTiming(1, { duration: 300 })
    );
  }, []);

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
  const inputBackground = useThemeColor(
    { light: "rgba(255,255,255,0.7)", dark: "rgba(25,30,40,0.7)" },
    "background"
  );
  const textColor = useThemeColor({}, "text");

  function generateRandomCode(length: number) {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function handleCreateGame() {
    createButtonScale.value = withSequence(
      withTiming(0.92, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    console.log({
      isPrivate,
      password,
      maxPlayers,
      gameCode,
    });

    titleScale.value = withSequence(
      withTiming(1.1, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
  }

  function refreshGameCode() {
    refreshButtonRotation.value = withTiming(
      refreshButtonRotation.value + 360,
      { duration: 500 }
    );
    setIsCodeRefreshed(true);
    setGameCode(generateRandomCode(6));

    setTimeout(() => {
      setIsCodeRefreshed(false);
    }, 1000);
  }

  const backButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: backButtonScale.value }],
    };
  });

  const createButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: createButtonScale.value }],
    };
  });

  const refreshButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${refreshButtonRotation.value}deg` },
        { scale: isCodeRefreshed ? withSpring(1.1) : withSpring(1) },
      ],
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: titleScale.value }],
    };
  });

  const iconFloatStyle = useAnimatedStyle(() => {
    const translateY = interpolate(iconFloat.value, [0, 1], [0, -7]);
    return {
      transform: [{ translateY }],
    };
  });

  const playerButtonsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: playerButtonsScale.value }],
    };
  });

  const decorativeStyles = StyleSheet.create({
    circle: {
      position: "absolute",
      borderRadius: 300,
      opacity: 0.4,
    },
    circle1: {
      width: 180,
      height: 180,
      backgroundColor: "#0a7ea4",
      top: -60,
      right: -60,
    },
    circle2: {
      width: 140,
      height: 140,
      backgroundColor: "#0a7ea4",
      opacity: 0.25,
      bottom: width * 0.7,
      left: -70,
    },
    circle3: {
      width: 100,
      height: 100,
      backgroundColor: "#0a7ea4",
      opacity: 0.15,
      top: width * 0.5,
      right: -30,
    },
  });

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
        style={[decorativeStyles.circle, decorativeStyles.circle1]}
      />
      <Animated.View
        entering={FadeIn.delay(500).duration(1200)}
        style={[decorativeStyles.circle, decorativeStyles.circle2]}
      />
      <Animated.View
        entering={FadeIn.delay(700).duration(1200)}
        style={[decorativeStyles.circle, decorativeStyles.circle3]}
      />

      {/* Back Button */}
      <Animated.View style={backButtonAnimatedStyle}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            backButtonScale.value = withSequence(
              withTiming(0.92, { duration: 100 }),
              withTiming(1, { duration: 100 })
            );
            setTimeout(() => router.back(), 100);
          }}
        >
          <IconSymbol
            name="chevron.right"
            size={24}
            color={buttonBackground}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        entering={FadeIn.duration(800)}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title with Floating Icon */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.header}
        >
          <View style={styles.titleContainer}>
            <Animated.View style={iconFloatStyle}>
              <View
                style={[
                  styles.iconBubble,
                  { backgroundColor: buttonBackground },
                ]}
              >
                <IconSymbol name="house.fill" size={20} color="#fff" />
              </View>
            </Animated.View>
            <Animated.View style={titleAnimatedStyle}>
              <ThemedText type="title" style={styles.title}>
                Créer une partie
              </ThemedText>
            </Animated.View>
          </View>
          <ThemedText style={styles.tagline}>
            Configurez votre session de jeu
          </ThemedText>
        </Animated.View>

        {/* Session Settings Card */}
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
            {/* Privacy Setting */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconWrapper}>
                  <IconSymbol
                    name="house.fill"
                    size={22}
                    color={buttonBackground}
                  />
                </View>
                <ThemedText style={styles.settingText}>
                  Session privée
                </ThemedText>
              </View>
              <Switch
                value={isPrivate}
                onValueChange={setIsPrivate}
                trackColor={{ false: "#767577", true: buttonBackground }}
                thumbColor={"#f4f3f4"}
              />
            </View>

            {/* Password Input (conditionally displayed) */}
            {isPrivate && (
              <Animated.View
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(300)}
                style={styles.passwordContainer}
              >
                <View style={styles.labelWithIcon}>
                  <IconSymbol
                    name="info.circle.fill"
                    size={16}
                    color={buttonBackground}
                  />
                  <ThemedText style={styles.inputLabel}>
                    Mot de passe
                  </ThemedText>
                </View>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBackground }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez un mot de passe"
                  placeholderTextColor="#9BA1A6"
                  secureTextEntry
                />
              </Animated.View>
            )}

            <View style={styles.divider} />

            {/* Max Players Slider */}
            <View style={styles.settingContainer}>
              <View style={styles.labelWithIcon}>
                <IconSymbol
                  name="info.circle.fill"
                  size={16}
                  color={buttonBackground}
                />
                <ThemedText style={styles.inputLabel}>
                  Nombre maximum de joueurs
                </ThemedText>
              </View>
              <Animated.View style={playerButtonsAnimatedStyle}>
                <View style={styles.playerCountContainer}>
                  {[2, 3, 4, 5, 6].map((num) => (
                    <TouchableOpacity
                      key={num}
                      style={[
                        styles.playerCountButton,
                        maxPlayers === num.toString()
                          ? {
                              backgroundColor: buttonBackground,
                              shadowColor: buttonBackground,
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.5,
                              shadowRadius: 4,
                              elevation: 4,
                            }
                          : { backgroundColor: inputBackground },
                      ]}
                      onPress={() => setMaxPlayers(num.toString())}
                    >
                      <ThemedText
                        style={[
                          styles.playerCountText,
                          maxPlayers === num.toString()
                            ? { color: "#fff" }
                            : {},
                        ]}
                      >
                        {num}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </View>

            <View style={styles.divider} />

            {/* Game Code Display */}
            <View style={styles.settingContainer}>
              <View style={styles.labelWithIcon}>
                <IconSymbol
                  name="info.circle.fill"
                  size={16}
                  color={buttonBackground}
                />
                <ThemedText style={styles.inputLabel}>
                  Code de la partie
                </ThemedText>
              </View>
              <View style={styles.gameCodeContainer}>
                <Animated.View
                  style={[
                    styles.gameCodeDisplay,
                    { backgroundColor: inputBackground },
                    isCodeRefreshed && styles.gameCodeFlash,
                  ]}
                >
                  <View style={styles.codeContent}>
                    <IconSymbol
                      name="chevron.left.forwardslash.chevron.right"
                      size={18}
                      color={textColor}
                      style={{ opacity: 0.6 }}
                    />
                    <ThemedText style={styles.gameCodeText}>
                      {gameCode}
                    </ThemedText>
                  </View>
                </Animated.View>
                <Animated.View style={refreshButtonAnimatedStyle}>
                  <TouchableOpacity
                    style={[
                      styles.refreshButton,
                      { backgroundColor: buttonBackground },
                    ]}
                    onPress={refreshGameCode}
                  >
                    <IconSymbol
                      name="chevron.right"
                      size={18}
                      color="#fff"
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <ThemedText style={styles.codeHelper}>
                Les joueurs pourront rejoindre avec ce code
              </ThemedText>
            </View>
          </ThemedView>
        </Animated.View>

        {/* Create Button */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(600)}
          style={[styles.buttonContainer, createButtonAnimatedStyle]}
        >
          <TouchableOpacity
            style={[
              styles.createButton,
              {
                backgroundColor: buttonBackground,
                shadowColor: buttonBackground,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              },
            ]}
            activeOpacity={0.9}
            onPress={handleCreateGame}
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
              Créer la partie
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>

        {/* Additional info text */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)}>
          <ThemedText style={styles.footerText}>
            Préparez-vous à un jeu sans papier ni crayon ! 🎮
          </ThemedText>
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
  content: {
    padding: 24,
    paddingTop: 90,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 36,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
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
  },
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  card: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1,
    backdropFilter: "blur(10px)",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,126,164,0.1)",
  },
  settingText: {
    fontSize: 17,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150,150,150,0.2)",
    width: "100%",
    marginVertical: 20,
  },
  settingContainer: {
    width: "100%",
    marginBottom: 4,
  },
  passwordContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 6,
  },
  labelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
  },
  playerCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  playerCountButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
  },
  playerCountText: {
    fontSize: 18,
    fontWeight: "600",
  },
  gameCodeContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  gameCodeDisplay: {
    flex: 1,
    height: 58,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
  },
  codeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gameCodeFlash: {
    borderColor: "#0a7ea4",
    borderWidth: 1.5,
  },
  gameCodeText: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1,
  },
  refreshButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  codeHelper: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 32,
  },
  createButton: {
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
  footerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15,
    opacity: 0.7,
    fontStyle: "italic",
  },
});
