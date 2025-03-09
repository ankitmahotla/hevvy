import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 pt-6 px-2">
      <ThemedText>Your first workout</ThemedText>
    </ThemedView>
  );
}
