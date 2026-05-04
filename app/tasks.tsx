import { deleteTask, getTask } from '@/lib/database';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
  Pending:  { dot: "#f5a623", text: "#f5a623", bg: "#fff8ee" },
  Ongoing:  { dot: "#5b8def", text: "#5b8def", bg: "#eef3ff" },
  Finished: { dot: "#3db87a", text: "#3db87a", bg: "#eefbf4" },
};

const taskIcons: Record<number, string> = {};
const iconPool = ["🎬", "📋", "📁", "📝", "🗂️", "✏️", "📌", "🎯"];
const getIcon = (id: number) => {
  if (!taskIcons[id]) taskIcons[id] = iconPool[id % iconPool.length];
  return taskIcons[id];
};

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTask = () => {
    try {
      const data = getTask();
      setTasks(data || []);
    } catch (error) {
      Alert.alert("Load Error", "Failed to Load the Tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, [])
  );

  const handleDelete = (id: number) => {
    try {
      deleteTask(id);
      loadTask();
    } catch (error) {
      Alert.alert("Delete Error", "Failed to Delete Task");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bacground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.pageTitle}>
          <Text style={styles.titlePurple}>Task </Text>
          <Text style={styles.titlePink}>List</Text>
          <Text style={styles.titleStar}> ☆</Text>
        </Text>

        {/* Add Task Button */}
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.85 }]}
          onPress={() => router.push("/add-tasks")}
        >
          <Text style={styles.addButtonText}>＋  Add Task</Text>
        </Pressable>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>🌸</Text>
            <Text style={styles.emptyText}>No tasks yet!</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const cfg = statusConfig[item.status] ?? { dot: "#aaa", text: "#aaa", bg: "#f5f5f5" };
              return (
                <View style={styles.card}>
                  {/* Top row */}
                  <View style={styles.cardTop}>
                    {/* Icon badge */}
                    <View style={styles.iconBadge}>
                      <Text style={styles.iconText}>{getIcon(item.id)}</Text>
                    </View>

                    {/* Title + description */}
                    <View style={styles.cardInfo}>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      {item.description ? (
                        <View style={styles.descRow}>
                          <Text style={styles.descIcon}>🏷</Text>
                          <Text style={styles.taskDescription} numberOfLines={1}>
                            {item.description}
                          </Text>
                        </View>
                      ) : null}
                      {/* Status badge */}
                      <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                        <View style={[styles.statusDot, { backgroundColor: cfg.dot }]} />
                        <Text style={[styles.statusText, { color: cfg.text }]}>{item.status}</Text>
                      </View>
                    </View>

                    {/* Three dots */}
                    <Text style={styles.dots}>⋮</Text>
                  </View>

                  {/* Divider */}
                  <View style={styles.divider} />

                  {/* Action Buttons */}
                  <View style={styles.actions}>
                    <Pressable
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => router.push({
                        pathname: "/task-detail",
                        params: { id: item.id, title: item.title, description: item.description, status: item.status },
                      })}
                    >
                      <Text style={styles.actionButtonText}>👁  View</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => router.push({
                        pathname: "/edit-tasks",
                        params: { id: item.id, title: item.title, description: item.description, status: item.status },
                      })}
                    >
                      <Text style={styles.actionButtonText}>✏️  Edit</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.actionButtonText}>🗑  Delete</Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        )}
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

  /* ── Page Title ── */
  pageTitle: {
    fontSize: 38,
    fontWeight: "800",
    fontStyle: "italic",
    marginBottom: 16,
  },
  titlePurple: { color: "#7c4dbd" },
  titlePink:   { color: "#e05c8a" },
  titleStar:   { color: "#f4a0b8", fontSize: 26 },

  /* ── Add Button ── */
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: "#9b59b6",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: "#c77ddb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  /* ── Empty ── */
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
  },
  emptyIcon: { fontSize: 48, marginBottom: 10 },
  emptyText: { fontSize: 16, color: "#b39ddb", fontWeight: "600" },

  /* ── Card ── */
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  /* Icon badge */
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#f0ebfa",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 26 },

  /* Card info */
  cardInfo: { flex: 1, gap: 4 },
  taskTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  descRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  descIcon: { fontSize: 12, color: "#9b59b6" },
  taskDescription: {
    fontSize: 13,
    color: "#9b59b6",
    flexShrink: 1,
  },

  /* Status badge */
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  /* Three dots */
  dots: {
    fontSize: 20,
    color: "#c4b5d6",
    paddingLeft: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#f0ebfa",
    marginVertical: 12,
  },

  /* ── Action Buttons ── */
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
  },
  viewButton:   { backgroundColor: "#5b8def" },
  editButton:   { backgroundColor: "#3db87a" },
  deleteButton: { backgroundColor: "#ef5350" },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});