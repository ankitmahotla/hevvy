import { router, Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { AppHeader } from "@/components/app-header";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DumbbellIcon,
  HomeIcon,
  PlayIcon,
  UserIcon,
  XIcon,
} from "lucide-react-native";
import { useAtom } from "jotai";
import { createWorkoutAtom } from "@/store/workout";
import { DiscardWorkoutModal } from "@/components/modals/discard-workout";

export default function TabLayout() {
  const [workout, setWorkout] = useAtom(createWorkoutAtom);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
      {workout.createdAt !== undefined && (
        <View className="absolute bottom-28 left-0 right-0">
          <View className="w-full rounded-t-2xl bg-zinc-800 px-4 pt-3">
            <Text className="text-lg text-center font-medium text-zinc-400">
              Workout in Progress
            </Text>
            <View className="w-full flex-row items-center justify-center gap-14">
              <Pressable
                onPress={() => router.push("/workout/empty")}
                className="flex-row items-center gap-2 px-3 py-2 rounded-lg"
              >
                <PlayIcon size={18} color="#3b82f6" />
                <Text className="text-lg font-medium text-blue-500">
                  Resume
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(true)}
                className="flex-row items-center gap-2 px-3 py-2 rounded-lg"
              >
                <XIcon size={18} color="#dc2626" />
                <Text className="text-lg font-medium text-red-600">
                  Discard
                </Text>
              </Pressable>

              <DiscardWorkoutModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
