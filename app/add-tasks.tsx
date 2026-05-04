import { addTask } from '@/lib/database';
import { router } from "expo-router";
import React, { useState } from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const statusOptions = ["Pending", "Ongoing", "Finished"];

const statusConfig: Record<string, { icon: string; color: string; borderColor: string; bg: string }> = {
  Pending:  { icon: "⏳", color: "#e05c7a", borderColor: "#f4a0b0", bg: "#fff0f3" },
  Ongoing:  { icon: "🔄", color: "#5b8def", borderColor: "#a0bff4", bg: "#f0f4ff" },
  Finished: { icon: "✅", color: "#3db87a", borderColor: "#90dbb8", bg: "#f0fbf5" },
};

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }
      addTask(title.trim(), description.trim(), status);
      Alert.alert("✅ Success!", `Task "${title}" added successfully!`);
      router.replace('/tasks');
    } catch (error: any) {
      Alert.alert("❌ Error", error.message || "Something went wrong");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bacground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable style={styles.backBtn} onPress={() => router.replace('/tasks')}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        </View>

        <Text style={styles.pageTitle}>
          <Text style={styles.titlePurple}>Add New </Text>
          <Text style={styles.titlePink}>Task</Text>
          <Text style={styles.titleStar}> ✦</Text>
        </Text>

        {/* Card */}
        <View style={styles.card}>

          {/* Task Title */}
          <Text style={styles.label}>📄  Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Task Title"
            placeholderTextColor="#c4b5d6"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.label}>💬  Task Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Task Description (Optional)"
            placeholderTextColor="#c4b5d6"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.divider} />

          {/* Status */}
          <Text style={styles.label}>🚩  Select Status</Text>
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

          {/* Save Button */}
          <Pressable
            style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.85 }]}
            onPress={handleSave}
          >
            <Text style={styles.saveBtnText}>💾  Save Task</Text>
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
  /* ── Page Title ── */
  pageTitle: {
    fontSize: 36,
    fontWeight: "800",
    fontStyle: "italic",
    marginTop: 8,
    marginBottom: 20,
    paddingLeft: 4,
  },
  titlePurple: { color: "#7c4dbd" },
  titlePink:   { color: "#e05c8a" },
  titleStar:   { color: "#f4a0b8", fontSize: 28 },
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
  divider: {
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
  /* ── Save Button ── */
  saveBtn: {
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "#9b59b6",
    shadowColor: "#c77ddb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 7,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});