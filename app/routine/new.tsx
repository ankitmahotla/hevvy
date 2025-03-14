import { DiscardWorkoutModal } from "@/components/modals/discard-workout";
import { StackHeader } from "@/components/stack-header";
import { router } from "expo-router";
import { ClockIcon, DumbbellIcon, PlusIcon } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

export default function NewRoutine() {
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
          <Text className="text-blue-500 font-medium">Cancel</Text>
        </Pressable>
        <Text className="text-lg text-white font-medium">Create Routine</Text>
        <Pressable className="bg-blue-500 rounded-lg px-3 py-2">
          <Text className="text-white text-center font-medium">Save</Text>
        </Pressable>
      </View>
      <View className="px-4 mt-6">
        <TextInput
          placeholder="Routine title"
          placeholderTextColor={"#a1a1aa"}
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "white",
          }}
        />
        <View className="mt-20 flex-col items-center justify-center">
          <DumbbellIcon size={50} color="#a1a1aa" />
          <Text className="text-zinc-400 mt-6">
            Get started by addding an exercise to your routine.
          </Text>
          <Pressable
            onPress={() => router.push("/add-exercise")}
            className="w-full flex-row justify-center items-center gap-3 bg-blue-500 rounded-lg px-3 py-2 mt-8"
          >
            <PlusIcon size={22} color="white" />
            <Text className="text-white font-medium text-lg">Add Exercise</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
