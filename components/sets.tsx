import { exerciseTypes } from "@/store/exercise";
import { EllipsisVertical, PlusIcon, Trash2 } from "lucide-react-native";
import { useAtom } from "jotai";
import { createWorkoutAtom, ExerciseInstance } from "@/store/workout";
import { useCallback } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface SetsProps {
  exerciseInstance: ExerciseInstance;
  filteredExercise: any;
}

const renderMeasurementField = (
  item: string,
  value: string | undefined,
  onChange: (text: string) => void,
) => {
  const placeholder =
    item === "REPS"
      ? "0"
      : item === "KG" || item === "+KG" || item === "-KG"
        ? "0 kg"
        : item === "TIME"
          ? "0:00"
          : "0 km";

  return (
    <TextInput
      key={item}
      placeholder={placeholder}
      className="text-white"
      placeholderTextColor="gray"
      keyboardType="numeric"
      style={{ textAlign: "center" }}
      value={value}
      onChangeText={onChange}
    />
  );
};

export const Sets = ({ exerciseInstance, filteredExercise }: SetsProps) => {
  const [workout, setWorkout] = useAtom(createWorkoutAtom);

  // Find exercise type properties for dynamic inputs
  const exerciseType = exerciseTypes.find(
    (item) => item.id === filteredExercise.exerciseTypeId,
  );

  if (!exerciseType) {
    console.error("Exercise type not found.");
    return null;
  }

  const setType = exerciseType.properties;
  const propertyWidth = 70 / setType.length;

  // Filter sets belonging to this exercise instance
  const setsForExercise = workout.sets.filter(
    (set) => set.exerciseInstanceId === exerciseInstance.id,
  );

  // Add a new empty set for this exercise instance
  const addSet = useCallback(() => {
    const newSet = {
      id: Date.now(), // simple unique id
      exerciseInstanceId: exerciseInstance.id,
    };
    setWorkout({
      ...workout,
      sets: [...workout.sets, newSet],
    });
  }, [exerciseInstance.id, workout, setWorkout]);

  // Update a field in a set
  const updateSetField = useCallback(
    (setId: number, field: string, value: string) => {
      const updatedSets = workout.sets.map((set) => {
        if (set.id === setId) {
          return {
            ...set,
            [field.toLowerCase()]: value,
          };
        }
        return set;
      });
      setWorkout({ ...workout, sets: updatedSets });
    },
    [workout, setWorkout],
  );

  // Delete a set by id
  const deleteSet = useCallback(
    (setId: number) => {
      const filteredSets = workout.sets.filter((set) => set.id !== setId);
      setWorkout({ ...workout, sets: filteredSets });
    },
    [workout, setWorkout],
  );

  return (
    <View key={exerciseInstance.id} className="mb-8">
      <View className="flex-row items-center justify-between pb-2">
        <Text className="text-blue-500 text-xl">{exerciseInstance.exerciseName}</Text>
        <EllipsisVertical size={18} color="white" />
      </View>

      {/* Headers row */}
      <View className="flex-row items-center pt-2">
        <View style={{ width: "20%" }}>
          <Text className="text-zinc-300">SETS</Text>
        </View>

        {/* Dynamic property headers */}
        <View className="flex-row" style={{ width: "70%" }}>
          {setType.map((item) => (
            <View key={item} style={{ width: `${propertyWidth}%` }}>
              <Text className="text-zinc-300 text-center">{item}</Text>
            </View>
          ))}
        </View>

        <View style={{ width: "10%", alignItems: "center" }}>
          {/* Actions column */}
        </View>
      </View>

      {/* Set data rows */}
      {setsForExercise.length === 0 && (
        <Text className="text-zinc-400 mt-4 text-center">
          No sets added yet
        </Text>
      )}

      {setsForExercise.map((set, i) => (
        <View key={set.id} className="flex-row items-center pt-4">
          <View style={{ width: "20%" }}>
            <Text className="text-white">{i + 1}</Text>
          </View>

          {/* Dynamic input fields */}
          <View className="flex-row" style={{ width: "70%" }}>
            {setType.map((item) => {
              const key = item.toLowerCase();
              const value = (set as any)[key] ?? "";

              return (
                <View key={item} style={{ width: `${propertyWidth}%` }}>
                  {renderMeasurementField(item, value, (text) =>
                    updateSetField(set.id, item, text),
                  )}
                </View>
              );
            })}
          </View>

          {/* Delete set button */}
          <View style={{ width: "10%", alignItems: "center" }}>
            <Pressable onPress={() => deleteSet(set.id)} className="p-2">
              <Trash2 size={20} color="red" />
            </Pressable>
          </View>
        </View>
      ))}

      {/* Add Set button */}
      <Pressable
        onPress={addSet}
        className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-6"
      >
        <PlusIcon size={22} color="white" />
        <Text className="text-lg font-medium text-white">Add Set</Text>
      </Pressable>
    </View>
  );
};
