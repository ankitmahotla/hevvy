import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function Equipment() {
  const equipments = [
    { id: 1, name: "None" },
    { id: 2, name: "Barbell" },
    { id: 3, name: "Dumbbell" },
    { id: 4, name: "Kettlebell" },
    { id: 5, name: "Machine" },
    { id: 6, name: "Plate" },
    { id: 7, name: "Resistance Band" },
    { id: 8, name: "Suspension Band" },
    { id: 9, name: "Other" },
  ];
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Select Equipment Type
        </Text>
      </View>
      {/* <View className="flex-row gap-3 items-center px-3 py-2 bg-zinc-800 rounded-lg my-4">
        <SearchIcon size={20} color="#71717a" />
        <TextInput
          placeholder="Search exercise"
          placeholderTextColor={"#71717a"}
        />
      </View> */}
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
