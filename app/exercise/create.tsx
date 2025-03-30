import { cn } from "@/lib/utils";
import { createExerciseAtom, exerciseAtom } from "@/store/exercise";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function CreateExercise() {
  const [exercise, setExercise] = useAtom(createExerciseAtom);
  const [exercises, setExercises] = useAtom(exerciseAtom);

  const formattedMuscleGroups = Array.isArray(exercise.otherMuscleGroups)
    ? exercise.otherMuscleGroups.join(", ")
    : exercise.otherMuscleGroups;

  const handleSavePress = () => {
    if (
      exercise &&
      exercise.name &&
      exercise.equipment &&
      exercise.primaryMuscleGroup
    ) {
      if (!exercises.some((item) => item.name === exercise.name)) {
        setExercises(async (prev) => {
          const currentExercises = await prev;
          return [...currentExercises, exercise];
        });

        // Reset the form after saving
        setExercise({
          name: "",
          equipment: "",
          primaryMuscleGroup: "",
          otherMuscleGroups: [],
        });

        router.back();
      } else {
        Alert.alert("This exercise exists already");
      }
    }
  };

  return (
    <View>
      <View
        className="flex-row items-center justify-between px-3"
        style={{
          borderBottomWidth: 2,
          borderBottomColor: "#a1a1aa",
          paddingBottom: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <ChevronLeft size={24} color="white" />
        </Pressable>
        <Text className="text-lg text-white font-medium">Create Exercise</Text>
        <Pressable
          onPress={handleSavePress}
          className="bg-blue-500 rounded-lg px-3 py-2"
        >
          <Text className="text-white text-center font-medium">Save</Text>
        </Pressable>
      </View>
      <View className="flex gap-4 px-4 mt-12">
        <TextInput
          value={exercise.name || ""}
          onChangeText={(text) => setExercise({ ...exercise, name: text })}
          placeholder="Exercise Name"
          placeholderTextColor={"#a1a1aa"}
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "white",
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: "#a1a1aa",
          }}
        />
        <Pressable onPress={() => router.push("/(bottomsheets)/equipment")}>
          <View className="flex-row items-center justify-between pb-3 border-b-[0.5px] border-b-zinc-400">
            <View>
              <Text className="text-lg text-white">Equipment</Text>
              <Text className="text-lg text-blue-500">
                {exercise.equipment === "" ? "Select" : exercise.equipment}
              </Text>
            </View>
            <ChevronRight color="#a1a1aa" size={20} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(bottomsheets)/primary-muscle")}
        >
          <View className="flex-row items-center justify-between pb-3 border-b-[0.5px] border-b-zinc-400">
            <View>
              <Text className="text-lg text-white">Primary Muscle Group</Text>
              <Text className="text-lg text-blue-500">
                {exercise.primaryMuscleGroup === ""
                  ? "Select"
                  : exercise.primaryMuscleGroup}
              </Text>
            </View>
            <ChevronRight color="#a1a1aa" size={20} />
          </View>
        </Pressable>

        {/* Display Added Muscle Groups */}
        <Pressable onPress={() => router.push("/(bottomsheets)/other-muscle")}>
          <View className="flex-row items-center justify-between pb-3 border-b-[0.5px] border-b-zinc-400">
            <View>
              <Text className="text-lg text-white">Other Muscles</Text>
              {/* Render comma-separated muscle groups */}
              <Text
                className={cn(
                  "text-lg",
                  formattedMuscleGroups ? "text-zinc-400" : "text-blue-500",
                )}
              >
                {formattedMuscleGroups || "Select (optional)"}
              </Text>
            </View>

            <ChevronRight color="#a1a1aa" size={20} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
