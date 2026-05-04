import { router, useLocalSearchParams } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
  Pending:  { dot: "#f5a623", text: "#f5a623", bg: "#fff8ee" },
  Ongoing:  { dot: "#5b8def", text: "#5b8def", bg: "#eef3ff" },
  Finished: { dot: "#3db87a", text: "#3db87a", bg: "#eefbf4" },
};

export default function TaskDetail() {
  const { id, title, description, status } = useLocalSearchParams();

  const statusStr = Array.isArray(status) ? status[0] : status ?? "";
  const cfg = statusConfig[statusStr] ?? { dot: "#aaa", text: "#aaa", bg: "#f5f5f5" };

  return (
    <ImageBackground
      source={require("../assets/images/bacground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        {/* Back Button */}
        <Pressable style={styles.backBtn} onPress={() => router.replace('/tasks')}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        {/* Page Title */}
        <View style={styles.titleWrap}>
          <Text style={styles.pageTitle}>
            <Text style={styles.titleArrow}>➢ </Text>
            <Text style={styles.titlePurple}>Task </Text>
            <Text style={styles.titlePink}>Details</Text>
            <Text style={styles.titleArrow}> ≤</Text>
          </Text>
          {/* Heart divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.heart}>♥</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Detail Card */}
        <View style={styles.card}>

          {/* ID Row */}
          <View style={styles.row}>
            <View style={[styles.iconBadge, { backgroundColor: "#ede7f6" }]}>
              <Text style={styles.iconText}>🪪</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.label, { color: "#7c5cbf" }]}>ID</Text>
              <Text style={styles.value}>{id}</Text>
            </View>
          </View>
          <View style={styles.rowDivider} />

          {/* Title Row */}
          <View style={styles.row}>
            <View style={[styles.iconBadge, { backgroundColor: "#fce4ec" }]}>
              <Text style={styles.iconText}>📄</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.label, { color: "#e05c8a" }]}>Title</Text>
              <Text style={styles.value}>{title}</Text>
            </View>
          </View>
          <View style={styles.rowDivider} />

          {/* Description Row */}
          <View style={styles.row}>
            <View style={[styles.iconBadge, { backgroundColor: "#e3f2fd" }]}>
              <Text style={styles.iconText}>💬</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.label, { color: "#5b8def" }]}>Description</Text>
              <Text style={styles.value}>{description || "No description"}</Text>
            </View>
          </View>
          <View style={styles.rowDivider} />

          {/* Status Row */}
          <View style={styles.row}>
            <View style={[styles.iconBadge, { backgroundColor: "#e8f5e9" }]}>
              <Text style={styles.iconText}>🚩</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.label, { color: "#3db87a" }]}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                <View style={[styles.statusDot, { backgroundColor: cfg.dot }]} />
                <Text style={[styles.statusText, { color: cfg.text }]}>{statusStr}</Text>
              </View>
            </View>
          </View>

        </View>
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
    paddingHorizontal: 20,
    paddingTop: 52,
  },

  /* ── Back Button ── */
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrow: {
    fontSize: 18,
    color: "#7c5cbf",
    fontWeight: "700",
  },

  /* ── Page Title ── */
  titleWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    fontStyle: "italic",
    textAlign: "center",
  },
  titleArrow: { color: "#c4a8e0", fontSize: 26 },
  titlePurple: { color: "#7c4dbd" },
  titlePink:   { color: "#e05c8a" },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  dividerLine: {
    width: 44,
    height: 1.5,
    backgroundColor: "#b07fc7",
    opacity: 0.5,
  },
  heart: {
    color: "#c97bbf",
    fontSize: 16,
  },

  /* ── Card ── */
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },

  /* ── Row ── */
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 14,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#f0ebfa",
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 22 },

  rowContent: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },

  /* ── Status Badge ── */
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
  },
});