import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { muscles } from "@/constants/muscles";
import { useAtom } from "jotai";
import { createExerciseAtom } from "@/store/exercise";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function PrimaryMuscleGroup() {
  const [exercise, setExercise] = useAtom(createExerciseAtom);
  const [searchInput, setSearchInput] = useState("");
  const [muscleList, setMuscleList] = useState(muscles);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handlePrimaryMuscleSelect = (primaryMuscleGroup: string) => {
    router.back();
    setExercise({ ...exercise, primaryMuscleGroup });
  };

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    const filterMuscles = () => {
      if (debouncedSearchInput) {
        setMuscleList(
          muscles.filter((muscle) =>
            muscle.name.includes(debouncedSearchInput),
          ),
        );
      } else {
        setMuscleList(muscles);
      }
    };
    filterMuscles();
  }, [debouncedSearchInput]);

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
          value={searchInput}
          onChangeText={handleInputChange}
          placeholder="Search muscle"
          placeholderTextColor={"#71717a"}
          className="text-white"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={muscleList}
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
