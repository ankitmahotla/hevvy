import {
  createExerciseAtom,
  ExerciseTypeInfo,
  exerciseTypes,
} from "@/store/exercise";
import { useAtom } from "jotai";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function ExerciseType() {
  const [exercise, setExercise] = useAtom(createExerciseAtom);

  const handleExerciseTypeSelect = (item: ExerciseTypeInfo) => {
    setExercise({ ...exercise, exerciseTypeId: item.id });
    router.back();
  };

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Select Exercise Type
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={exerciseTypes}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleExerciseTypeSelect(item)}>
            <View className="py-3 border-b-[0.5px] border-b-zinc-400">
              <Text className="text-white text-lg font-medium">
                {item.name}
              </Text>
              <Text className="text-zinc-400 text-sm">
                Examples: {item.example}
              </Text>
              <View className="flex-row items-center gap-3 mt-2">
                {item.properties.map((prop, index) => (
                  <View key={index} className="bg-white p-1 rounded-md">
                    <Text className="text-black text-sm">{prop}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Pressable>
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
}
