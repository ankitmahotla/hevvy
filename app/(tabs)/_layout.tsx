import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppHeader } from "@/components/app-header";
import { SafeAreaView } from "react-native-safe-area-context";
import { DumbbellIcon, HomeIcon, UserIcon } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarButton: HapticTab,
          header: ({ route }) => {
            const title =
              route.name === "index"
                ? "Home"
                : route.name.charAt(0).toUpperCase() + route.name.slice(1);
            return (
              <View className="px-2 pt-4">
                <AppHeader title={title} />
              </View>
            );
          },
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            tabBarIcon: ({ color }) => <DumbbellIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <UserIcon size={28} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
