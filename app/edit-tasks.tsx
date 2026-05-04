import { updateTask } from '@/lib/database';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const statusOptions = ["Pending", "Ongoing", "Finished"];

const statusConfig: Record<string, { icon: string; color: string; borderColor: string; bg: string }> = {
  Pending:  { icon: "⏳", color: "#e05c7a", borderColor: "#f4a0b0", bg: "#fff0f3" },
  Ongoing:  { icon: "🔄", color: "#5b8def", borderColor: "#a0bff4", bg: "#f0f4ff" },
  Finished: { icon: "✅", color: "#3db87a", borderColor: "#90dbb8", bg: "#f0fbf5" },
};

export default function EditTaskScreen() {
  const { id, title: initialTitle, description: initialDescription, status: initialStatus } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle as string);
    if (initialDescription) setDescription(initialDescription as string);
    if (initialStatus) setStatus(initialStatus as string);
  }, [initialTitle, initialDescription, initialStatus]);

  const handleUpdate = async () => {
    try {
      if (!title.trim()) throw new Error("Task title is required");

      await updateTask(Number(id), title.trim(), description.trim(), status);

      Alert.alert("✅ Success!", "Task updated successfully!");
      router.replace('/tasks');
    } catch (error: any) {
      Alert.alert("❌ Error", error.message || "Failed to update task");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bacground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Back Button */}
        <View style={styles.headerRow}>
          <Pressable style={styles.backBtn} onPress={() => router.replace('/tasks')}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        </View>

        {/* Page Title */}
        <View style={styles.titleWrap}>
          <Text style={styles.pageTitle}>
            <Text style={styles.titleArrow}>➢ </Text>
            <Text style={styles.titlePurple}>Edit </Text>
            <Text style={styles.titlePink}>Task</Text>
            <Text style={styles.titleArrow}> ≤</Text>
          </Text>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.heart}>♥</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Task Title */}
          <Text style={styles.label}>📄  Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor="#c4b5d6"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.cardDivider} />

          {/* Description */}
          <Text style={styles.label}>💬  Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#c4b5d6"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.cardDivider} />

          {/* Status */}
          <Text style={styles.label}>🚩  Status</Text>
          <View style={styles.statusContainer}>
            {statusOptions.map((option) => {
              const cfg = statusConfig[option];
              const isActive = status === option;
              return (
                <Pressable
                  key={option}
                  style={[
                    styles.statusButton,
                    { borderColor: cfg.borderColor },
                    isActive && { backgroundColor: cfg.bg, borderColor: cfg.color },
                  ]}
                  onPress={() => setStatus(option)}
                >
                  <Text style={styles.statusIcon}>{cfg.icon}</Text>
                  <Text style={[styles.statusText, isActive && { color: cfg.color, fontWeight: "700" }]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Update Button */}
          <Pressable
            style={({ pressed }) => [styles.updateBtn, pressed && { opacity: 0.85 }]}
            onPress={handleUpdate}
          >
            <Text style={styles.updateBtnText}>✏️  Update Task</Text>
          </Pressable>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  /* ── Header ── */
  headerRow: {
    marginTop: 8,
    marginBottom: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
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
  /* ── Title ── */
  titleWrap: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 32,
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
    backgroundColor: "rgba(255,255,255,0.93)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#ede7f6",
    marginVertical: 16,
  },
  /* ── Labels ── */
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#7c5cbf",
    marginBottom: 10,
  },
  /* ── Inputs ── */
  input: {
    borderWidth: 1.5,
    borderColor: "#d8c8f0",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#faf8ff",
    marginBottom: 4,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  /* ── Status Buttons ── */
  statusContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statusButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 4,
  },
  statusIcon: { fontSize: 16 },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  /* ── Update Button ── */
  updateBtn: {
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "#7c4dbd",
    shadowColor: "#9b59b6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 7,
  },
  updateBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});