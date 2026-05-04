import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialized Database");
    }
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/bacground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Clipboard emoji as a lightweight icon stand-in */}
        <Text style={styles.icon}>📋</Text>

        <Text style={styles.titleMini}>Mini Task</Text>
        <Text style={styles.titleSub}>Application</Text>

        {/* Decorative heart divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.heart}>♥</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/tasks")}
        >
          <Text style={styles.buttonText}>Open Task  →</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  /* ── Icon ── */
  icon: {
    fontSize: 52,
    marginBottom: 8,
  },

  /* ── Title ── */
  titleMini: {
    fontSize: 42,
    fontWeight: "800",
    fontStyle: "italic",
    color: "#9b59b6",          // purple matching the bg
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  titleSub: {
    fontSize: 28,
    fontWeight: "700",
    fontStyle: "italic",
    color: "#333",
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginTop: -4,
    marginBottom: 16,
  },

  /* ── Heart divider ── */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 8,
  },
  dividerLine: {
    width: 48,
    height: 1.5,
    backgroundColor: "#b07fc7",
    opacity: 0.6,
  },
  heart: {
    color: "#c97bbf",
    fontSize: 16,
  },

  /* ── Button ── */
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 32,
    // gradient-like via layered shadow + solid fill
    backgroundColor: "#8e60d4",
    shadowColor: "#c77ddb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});