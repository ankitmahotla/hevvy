import { router } from "expo-router";
import {
  ChevronDownIcon,
  LogsIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Workout() {
  return (
    <View className="flex-1 pt-6 px-2">
      <Text className="text-white">Quick Workout</Text>
      <Pressable onPress={() => router.push("/workout/empty")} className="w-full flex-row gap-4 bg-zinc-800 items-center px-4 py-3 rounded-lg mt-4">
        <PlusIcon
          size={24}
         color="white"
        />
        <Text className="text-lg text-white text-center">
          Start Empty Workout
        </Text>
      </Pressable>
      <Text className="mt-8 text-white">Routines</Text>
      <View className="flex-row w-full items-center justify-between">
        <Pressable className="w-[47%] flex-row gap-4 bg-zinc-800 items-center px-4 py-3 rounded-lg mt-4">
          <LogsIcon
            size={22}
           color="white"
          />
          <Text className="text-lg text-white text-center">New Routine</Text>
        </Pressable>
        <Pressable className="w-[47%] flex-row gap-4 bg-zinc-800 items-center px-4 py-3 rounded-lg mt-4">
          <SearchIcon
            size={22}
             color="white"
          />
          <Text className="text-lg text-white text-center">Explore</Text>
        </Pressable>
      </View>
      <View className="flex-row items-center gap-2 mt-4">
        <ChevronDownIcon
          size={18}
          color="white"
          className="bg-black"
        />
        <Text className="text-white">My Routines</Text>
      </View>
    </View>
  );
}
