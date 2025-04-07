import { DiscardWorkoutModal } from "@/components/modals/discard-workout";
import { Sets } from "@/components/sets";
import { StackHeader } from "@/components/stack-header";
import { exercisesAtom } from "@/store/exercise";
import { createWorkoutAtom } from "@/store/workout";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { DumbbellIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Empty() {
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises] = useAtom(exercisesAtom);
  const [workout, setWorkout] = useAtom(createWorkoutAtom);

  return (
    <View>
      <StackHeader title="Log Workout">
        <View className="flex-row items-center gap-2 mx-2">
          {/* <ClockIcon size={24} color="white" /> */}
          <Pressable className="bg-blue-500 rounded-lg px-3 py-2">
            <Text className="text-white text-center font-medium">Finish</Text>
          </Pressable>
        </View>
      </StackHeader>
      <View className="px-4 mt-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-zinc-300 text-sm">Duration</Text>
            <Text className="text-blue-500 text-lg">10 mins</Text>
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
        <View className="mt-10">
          {workout.exercises.length > 0 ? (
            workout.exercises.map((exercise) =>
              exercises
                .filter((storedExercise) => exercise === storedExercise.name)
                .map((filteredExercise, index) => (
                  <Sets
                    key={filteredExercise.name}
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

          <Pressable
            onPress={() => router.push("/add-exercise")}
            className="w-full flex-row justify-center items-center gap-3 bg-blue-500 rounded-lg px-3 py-2 mt-8"
          >
            <PlusIcon size={22} color="white" />
            <Text className="text-white font-medium text-lg">Add Exercise</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-4"
          >
            <Text className="text-red-600 font-medium text-lg">
              Discard Workout
            </Text>
          </Pressable>
          <DiscardWorkoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </View>
  );
}
