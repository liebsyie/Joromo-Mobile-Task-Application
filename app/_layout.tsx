import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9b59b6',
        tabBarInactiveTintColor: '#c4b5d6',
        tabBarStyle: {
          height: 75,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          borderRadius: 30,
          marginHorizontal: 12,
          marginBottom: 10,
          position: 'absolute',
          shadowColor: '#b39ddb',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 2. CENTER floating + circle → Add Task */}
      <Tabs.Screen
        name="add-tasks"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={32} color="#fff" />
            </View>
          ),
        }}
      />

      {/* 3. Task List */}
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Task List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Hidden screens */}
      <Tabs.Screen
        name="task-detail"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="edit-tasks"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#c77ddb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#c77ddb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});