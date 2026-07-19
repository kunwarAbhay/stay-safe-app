import React from "react";
import { Tabs } from "expo-router";
import { Home, MapPin, Users, PhoneCall } from "lucide-react-native";
import { View } from "react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C3AED", // Primary purple
        tabBarInactiveTintColor: "#A1A1AA", // Muted zinc
        tabBarShowLabel: false, // Hide tab label text
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#000",
          bottom: 20,
          marginHorizontal: 20,
          height: 74,
          borderRadius: 40,
          padding: 20,
          alignItems: "stretch",
          justifyContent: "center",
          borderColor: "rgba(150, 150, 150, 0.15)",
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 15,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className={cn("p-2.5 rounded-full", focused && "bg-white")}>
              <Home size={24}  className={cn("text-white", focused && "text-black")} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Tracker",
          tabBarIcon: ({ focused }) => (
           <View className={cn("p-2.5 rounded-full", focused && "bg-white")}>
              <MapPin size={24}  className={cn("text-white", focused && "text-black")} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ focused }) => (
            <View className={cn("p-2.5 rounded-full", focused && "bg-white")}>
              <Users size={24}  className={cn("text-white", focused && "text-black")} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="helpline"
        options={{
          title: "Helpline",
          tabBarIcon: ({ focused }) => (
            <View className={cn("p-2.5 rounded-full", focused && "bg-white")}>
              <PhoneCall size={24} className={cn("text-white", focused && "text-black")} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
