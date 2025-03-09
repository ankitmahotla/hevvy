import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  ChevronDownIcon,
  LogsIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react-native";
import { Pressable } from "react-native";

export default function Workout() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView className="flex-1 pt-6 px-2">
      <ThemedText>Quick Workout</ThemedText>
      <Pressable className="w-full flex-row gap-4 bg-primary items-center px-4 py-3 rounded-lg mt-4">
        <PlusIcon
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <ThemedText className="text-lg text-center">
          Start Empty Workout
        </ThemedText>
      </Pressable>
      <ThemedText className="mt-8">Quick Workout</ThemedText>
      <ThemedView className="flex-row w-full items-center justify-between">
        <Pressable className="w-[47%] flex-row gap-4 bg-primary items-center px-4 py-3 rounded-lg mt-4">
          <LogsIcon
            size={22}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <ThemedText className="text-lg text-center">New Routine</ThemedText>
        </Pressable>
        <Pressable className="w-[47%] flex-row gap-4 bg-primary items-center px-4 py-3 rounded-lg mt-4">
          <SearchIcon
            size={22}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <ThemedText className="text-lg text-center">Explore</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView className="flex-row items-center gap-2 mt-4">
        <ChevronDownIcon
          size={18}
          color={colorScheme === "dark" ? "white" : "black"}
          className="bg-black"
        />
        <ThemedText>My Routines</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
