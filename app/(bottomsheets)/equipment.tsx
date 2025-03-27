import { equipments } from "@/constants/equipments";
import { createExerciseAtom } from "@/store/exercise";
import { useAtom } from "jotai";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function Equipment() {
  const [exercise, setExercise] = useAtom(createExerciseAtom);

  const handleEquipmentSelect = (equipment: string) => {
    router.back();
    setExercise({ ...exercise, equipment });
  };

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Select Equipment Type
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={equipments}
        renderItem={({ item }) => (
          <Pressable onPress={handleEquipmentSelect.bind(null, item.name)}>
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
