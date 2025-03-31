import { exerciseAtom } from "@/store/exercise";
import { useDebounce } from "@uidotdev/usehooks";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function AddExercise() {
  const [exercises] = useAtom(exerciseAtom);
  const [searchInput, setSearchInput] = useState("");
  const [exerciseList, setExerciseList] = useState(exercises);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    const filterExercise = () => {
      if (debouncedSearchInput) {
        setExerciseList(
          exercises.filter((exercise) =>
            exercise.name.includes(debouncedSearchInput),
          ),
        );
      } else {
        setExerciseList(exercises);
      }
    };
    filterExercise();
  }, [debouncedSearchInput]);

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
          value={searchInput}
          onChangeText={handleInputChange}
          placeholder="Search exercise"
          placeholderTextColor={"#71717a"}
          className="text-white"
        />
      </View>
      <Text className="text-zinc-500">Recent Exercises</Text>
      {exercises.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={exerciseList}
          renderItem={({ item }) => (
            <Pressable>
              <View className="py-3 border-b-[0.5px] border-b-zinc-400">
                <Text className="text-white text-lg font-medium">
                  {item.name}
                </Text>
                <Text className="text-zinc-500 font-medium">
                  {item.primaryMuscleGroup}
                </Text>
              </View>
            </Pressable>
          )}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      )}
    </View>
  );
}
