import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function PrimaryMuscleGroup() {
  const equipments = [
    { id: 1, name: "Abdominals" },
    { id: 2, name: "Abductors" },
    { id: 3, name: "Adductors" },
    { id: 4, name: "Biceps" },
    { id: 5, name: "Calves" },
    { id: 6, name: "Cardio" },
    { id: 7, name: "Chest" },
    { id: 8, name: "Forearms" },
    { id: 9, name: "Full Body" },
    { id: 10, name: "Glutes" },
    { id: 11, name: "Hamstrings" },
    { id: 12, name: "Lats" },
    { id: 13, name: "Lower Back" },
    { id: 14, name: "Neck" },
    { id: 15, name: "Quadriceps" },
    { id: 16, name: "Shoulders" },
    { id: 17, name: "Traps" },
    { id: 18, name: "Triceps" },
    { id: 19, name: "Upper Back" },
    { id: 20, name: "Other" },
  ];
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
        data={equipments}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.back();
              router.setParams({ equipment: item.name });
            }}
          >
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
