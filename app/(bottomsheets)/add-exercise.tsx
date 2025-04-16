import { exercisesAtom } from "@/store/exercise";
import { createWorkoutAtom, ExerciseInstance } from "@/store/workout";
import { useDebounce } from "@uidotdev/usehooks";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import 'react-native-get-random-values'; // must be imported before uuid
import { v4 as uuidv4 } from 'uuid';

export default function AddExercise() {
  const [exercises] = useAtom(exercisesAtom);
  const [searchInput, setSearchInput] = useState("");
  const [exerciseList, setExerciseList] = useState(exercises);
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [workout, setWorkout] = useAtom(createWorkoutAtom);

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    if (debouncedSearchInput) {
      setExerciseList(
        exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(debouncedSearchInput.toLowerCase()),
        ),
      );
    } else {
      setExerciseList(exercises);
    }
  }, [debouncedSearchInput, exercises]);

  const handleSelectExercise = (exercise: any) => {
    const uniqueId = uuidv4();
    const newExerciseInstance: ExerciseInstance = {
      id: uniqueId,
      exerciseName: exercise.name,
    };

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, newExerciseInstance],
    });

    router.back(); // go back after adding
  };

  return (
    <View className="px-4 py-3 flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-blue-500 font-medium">Cancel</Text>
        </Pressable>
        <Text className="text-white text-lg font-medium">Add Exercise</Text>
        <Pressable onPress={() => router.replace("/exercise/create")}>
          <Text className="text-blue-500 font-medium">Create</Text>
        </Pressable>
      </View>

      {/* Search bar */}
      <View className="flex-row gap-3 items-center px-3 py-2 bg-zinc-800 rounded-lg my-4">
        <SearchIcon size={20} color="#71717a" />
        <TextInput
          value={searchInput}
          onChangeText={handleInputChange}
          placeholder="Search exercise"
          placeholderTextColor="#71717a"
          className="text-white flex-1"
        />
      </View>

      {/* List of exercises */}
      <Text className="text-zinc-500 mb-2">Recent Exercises</Text>
      {exerciseList.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={exerciseList}
          keyExtractor={(item) => item.name} // Use item.name as the key
          renderItem={({ item }) => (
            <Pressable onPress={() => handleSelectExercise(item)}>
              <View className="py-3 border-b-[0.5px] border-b-zinc-400">
                <Text className="text-white text-lg font-medium">{item.name}</Text>
                <Text className="text-zinc-500 font-medium">{item.primaryMuscleGroup}</Text>
              </View>
            </Pressable>
          )}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      )}
    </View>
  );
}
