import { DiscardWorkoutModal } from "@/components/modals/discard-workout";
import { Sets } from "@/components/sets";
import { StackHeader } from "@/components/stack-header";
import { exercisesAtom } from "@/store/exercise";
import { createWorkoutAtom } from "@/store/workout";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { DumbbellIcon, PlusIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Empty() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [exercises] = useAtom(exercisesAtom);
  const [workout, setWorkout] = useAtom(createWorkoutAtom);
  const [duration, setDuration] = useState<string>("");

  // Function to format duration
  const formatDuration = (startTime: Date): string => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);

    const days = Math.floor(elapsed / 86400);
    const hours = Math.floor((elapsed % 86400) / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    let formattedDuration = "";
    if (days > 0) formattedDuration += `${days}d `;
    if (hours > 0 || days > 0) formattedDuration += `${hours}hr `;
    if (minutes > 0 || hours > 0 || days > 0)
      formattedDuration += `${minutes}min `;
    formattedDuration += `${seconds}s`;

    return formattedDuration.trim();
  };

  useEffect(() => {
    // Initialize workout creation time if not already set
    if (!workout.created_at) {
      setWorkout({
        ...workout,
        created_at: new Date(),
      });
    }

    // Update duration every second
    const intervalId = setInterval(() => {
      if (workout.created_at) {
        setDuration(formatDuration(workout.created_at));
      }
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [workout, setWorkout]);

  return (
    <View>
      <StackHeader title="Log Workout">
        <View className="flex-row items-center gap-2 mx-2">
          <Pressable className="bg-blue-500 rounded-lg px-3 py-2">
            <Text className="text-white text-center font-medium">Finish</Text>
          </Pressable>
        </View>
      </StackHeader>

      <View className="px-4 mt-6">
        {/* Workout Stats */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-zinc-300 text-sm">Duration</Text>
            <Text className="text-blue-500 text-lg">{duration}</Text>
          </View>
          <View>
            <Text className="text-zinc-300 text-sm">Volume</Text>
            <Text className="text-white text-lg">0 kg</Text>
          </View>
          <View>
            <Text className="text-zinc-300 text-sm">Sets</Text>
            <Text className="text-white text-lg">0</Text>
          </View>
        </View>

        {/* Exercises */}
        <View className="mt-10">
          {workout.exercises.length > 0 ? (
            workout.exercises.map((exerciseName, index) =>
              exercises
                .filter(
                  (storedExercise) => exerciseName === storedExercise.name,
                )
                .map((filteredExercise) => (
                  <Sets
                    key={`${filteredExercise.name}-${index}`} // Ensure unique keys
                    filteredExercise={filteredExercise}
                    index={index}
                  />
                )),
            )
          ) : (
            // Display a message if no exercises are found
            <View className="flex-col items-center justify-center">
              <DumbbellIcon size={50} color="white" />
              <Text className="text-white text-lg font-semibold mt-6">
                Get Started
              </Text>
              <Text className="text-zinc-300">
                Add an exercise to start your workout
              </Text>
            </View>
          )}

          {/* Add Exercise Button */}
          <Pressable
            onPress={() => router.push("/add-exercise")}
            className="w-full flex-row justify-center items-center gap-3 bg-blue-500 rounded-lg px-3 py-2 mt-8"
          >
            <PlusIcon size={22} color="white" />
            <Text className="text-white font-medium text-lg">Add Exercise</Text>
          </Pressable>

          {/* Discard Workout Button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-4"
          >
            <Text className="text-red-600 font-medium text-lg">
              Discard Workout
            </Text>
          </Pressable>

          {/* Discard Workout Modal */}
          <DiscardWorkoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </View>
  );
}
