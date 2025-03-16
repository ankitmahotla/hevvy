import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseLayout() {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Stack>
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
