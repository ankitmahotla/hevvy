import { DiscardWorkoutModal } from "@/components/modals/discard-workout";
import { Sets } from "@/components/sets";
import { StackHeader } from "@/components/stack-header";
import { exercisesAtom } from "@/store/exercise";
import { createWorkoutAtom, ExerciseInstance } from "@/store/workout";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { DumbbellIcon, PlusIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Empty() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [exercises] = useAtom(exercisesAtom);
  const [workout, setWorkout] = useAtom(createWorkoutAtom);
  const [duration, setDuration] = useState<string>("");

  // Format duration string from ISO or Date
  const formatDuration = (startTime: string | Date): string => {
    let date: Date;
    if (typeof startTime === "string") {
      date = new Date(startTime);
    } else if (startTime instanceof Date) {
      date = startTime;
    } else {
      console.error("Invalid startTime passed to formatDuration:", startTime);
      return "0s";
    }
    if (isNaN(date.getTime())) {
      console.error("Invalid date object created from startTime:", date);
      return "0s";
    }
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - date.getTime()) / 1000);
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

  // Set createdAt if not set and update duration every second
  useEffect(() => {
    if (!workout.createdAt) {
      setWorkout({
        ...workout,
        createdAt: new Date().toISOString(),
      });
    }
    const intervalId = setInterval(() => {
      if (workout.createdAt) {
        setDuration(formatDuration(workout.createdAt));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [workout, setWorkout]);

  // Calculate total volume (sum of weights * reps)
  const totalVolume = workout.sets.reduce((acc, set) => {
    const weight = parseFloat(set.weight || "0");
    const reps = parseInt(set.reps || "0", 10);
    return acc + weight * reps;
  }, 0);

  // Calculate total sets
  const totalSets = workout.sets.length;

  return (
    <View style={{ flex: 1 }}>
      <StackHeader title="Log Workout">
        <View className="flex-row items-center gap-2 mx-2">
          <Pressable className="bg-blue-500 rounded-lg px-3 py-2">
            <Text className="text-white text-center font-medium">Finish</Text>
          </Pressable>
        </View>
      </StackHeader>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Workout Stats */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-zinc-300 text-sm">Duration</Text>
            <Text className="text-blue-500 text-lg">{duration}</Text>
          </View>
          <View>
            <Text className="text-zinc-300 text-sm">Volume</Text>
            <Text className="text-white text-lg">
              {totalVolume.toFixed(1)} kg
            </Text>
          </View>
          <View>
            <Text className="text-zinc-300 text-sm">Sets</Text>
            <Text className="text-white text-lg">{totalSets}</Text>
          </View>
        </View>

        {/* Exercises */}
        <View className="mt-10 flex-1">
          {workout.exercises.length > 0 ? (
            workout.exercises.map((exerciseInstance) => {
              const filteredExercise = exercises.find(
                (ex) => ex.name === exerciseInstance.exerciseName,
              );
              if (!filteredExercise) return null;

              return (
                <Sets
                  key={exerciseInstance.id}
                  filteredExercise={filteredExercise}
                  exerciseInstance={exerciseInstance}
                />
              );
            })
          ) : (
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
      </ScrollView>
    </View>
  );
}
