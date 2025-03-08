import { ChevronLeft } from "lucide-react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Pressable } from "react-native";
import { router } from "expo-router";

interface StackHeaderProps {
  title: String;
}

export const StackHeader = ({ title }: StackHeaderProps) => {
  return (
    <ThemedView>
      <Pressable
        className="flex-row items-center gap-4"
        onPress={() => router.back()}
      >
        <ChevronLeft size={20} color="white" />
        <ThemedText className="text-lg font-medium">{title}</ThemedText>
      </Pressable>
    </ThemedView>
  );
};
