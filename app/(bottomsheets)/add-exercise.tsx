import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

export default function AddExercise() {
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-between py-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-blue-500 font-medium">Cancel</Text>
        </Pressable>
        <Text className="text-white text-lg font-medium">Add Exercise</Text>
        <Pressable onPress={() => router.replace("/exercise/create")}>
          <Text className="text-blue-500 font-medium">Create</Text>
        </Pressable>
      </View>

      <View className="flex-row gap-3 items-center px-3 py-2 bg-zinc-800 rounded-lg my-4">
        <SearchIcon size={20} color="#71717a" />
        <TextInput
          placeholder="Search exercise"
          placeholderTextColor={"#71717a"}
        />
      </View>
      <Text className="text-zinc-500">Recent Exercises</Text>
    </View>
  );
}
