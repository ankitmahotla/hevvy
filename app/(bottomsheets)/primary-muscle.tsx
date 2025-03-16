import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PrimaryMuscleGroup() {
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Select Muscle Group
        </Text>
      </View>
    </View>
  );
}
