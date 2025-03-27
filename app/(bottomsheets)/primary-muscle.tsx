import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { muscles } from "@/constants/muscles";
import { useAtom } from "jotai";
import { createExerciseAtom } from "@/store/exercise";

export default function PrimaryMuscleGroup() {
  const [exercise, setExercise] = useAtom(createExerciseAtom);

  const handlePrimaryMuscleSelect = (primaryMuscleGroup: string) => {
    router.back();
    setExercise({ ...exercise, primaryMuscleGroup });
  };
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Select Muscle Group
        </Text>
      </View>
      <View className="flex-row gap-3 items-center px-3 py-2 bg-zinc-800 rounded-lg my-4">
        <SearchIcon size={20} color="#71717a" />
        <TextInput
          placeholder="Search muscle"
          placeholderTextColor={"#71717a"}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={muscles}
        renderItem={({ item }) => (
          <Pressable onPress={handlePrimaryMuscleSelect.bind(null, item.name)}>
            <View className="py-3 border-b-[0.5px] border-b-zinc-400">
              <Text className="text-white text-lg font-medium">
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
}
