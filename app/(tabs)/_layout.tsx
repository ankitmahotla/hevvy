import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { AppHeader } from "@/components/app-header";
import { SafeAreaView } from "react-native-safe-area-context";
import { DumbbellIcon, HomeIcon, UserIcon } from "lucide-react-native";
import { useAtom } from "jotai";
import { createWorkoutAtom } from "@/store/workout";
import { RESET, useResetAtom } from "jotai/utils";

export default function TabLayout() {
  const [workout, setWorkout] = useAtom(createWorkoutAtom);
  const resetWorkoutAtom = useResetAtom(createWorkoutAtom);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Tabs
        screenOptions={{
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
      {workout.exercises.length > 0 && (
        <View className="absolute bottom-32 left-0 right-0">
          <View className="w-full flex-col items-center px-4">
            <Pressable
              onPress={resetWorkoutAtom}
              className="items-center px-3 py-2 bg-blue-500 rounded-lg"
            >
              <Text className="text-white">Reset</Text>
            </Pressable>
          </View>
          {/* <Text className="text-white"> hello</Text> */}
        </View>
      )}
    </SafeAreaView>
  );
}
