import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutLayout() {
    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <Stack>
                <Stack.Screen name="empty" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    )
}