import { PlusIcon } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

interface SetsProps {
  filteredExercise: any;
  index: number;
}

export const Sets = ({ filteredExercise, index }: SetsProps) => {
  return (
    <View key={filteredExercise.name}>
      <Text className="text-blue-500 text-xl">{filteredExercise.name}</Text>
      <View className="flex-row gap-2 items-center justify-between pt-2">
        <Text className="text-zinc-300">SETS</Text>
        <Text className="text-zinc-300">KM</Text>
        <Text className="text-zinc-300">TIME</Text>
        <Text className="text-zinc-300">✅</Text>
      </View>
      <View className="flex-row gap-2 items-center justify-between pt-4">
        <Text className="text-white">{index + 1}</Text>
        <TextInput placeholder="0" />
        <TextInput placeholder="0" />
        <Pressable>
          <Text>☑️</Text>
        </Pressable>
      </View>
      <Pressable className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-6">
        <PlusIcon size={22} color="white" />
        <Text className="text-lg font-medium text-white">Add Set</Text>
      </Pressable>
      <Text className="text-white pt-2">
        {/* Name: , Type: {filteredExercise.exerciseTypeId}, Duration:{" "}
        {filteredExercise.equipment} */}
      </Text>
    </View>
  );
};
