import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomSheetLayout() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add-exercise" />
        <Stack.Screen name="equipment" />
        <Stack.Screen name="primary-muscle" />
        <Stack.Screen name="other-muscle" />
      </Stack>
    </SafeAreaView>
  );
}
