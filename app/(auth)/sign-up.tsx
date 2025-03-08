import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";

export default function SignUp() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ThemedView className="flex-1 pt-12 px-2">
        <ScreenHeader title="Sign Up" />
        <ThemedView className="px-6">
          <ThemedView className="gap-8 mt-10">
            <ThemedView className="border-b border-b-zinc-400">
              <ThemedText className="text-lg">Email</ThemedText>
              <TextInput
                placeholder="johndoe@gmail.com"
                className="text-white rounded-lg border-b border-b-zinc-400 px-2 py-2 mt-1"
                placeholderTextColor="gray"
              />
            </ThemedView>
            <ThemedView className="border-b border-b-zinc-400">
              <ThemedText className="text-lg">Password</ThemedText>
              <TextInput
                placeholder="minimum 6 characters"
                className="text-white [rounded-lg px-2 py-2 mt-1"
                placeholderTextColor="gray"
                secureTextEntry={true}
              />
            </ThemedView>
            <ThemedView className="border-b border-b-zinc-400">
              <ThemedText className="text-lg">Username</ThemedText>
              <TextInput
                placeholder="username"
                className="text-white rounded-lg border-b border-b-zinc-400 px-2 py-2 mt-1"
                placeholderTextColor="gray"
              />
            </ThemedView>
          </ThemedView>

          <Pressable className="w-full bg-zinc-400 px-3 py-2 rounded-lg mt-10">
            <ThemedText className="text-lg text-center">Continue</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
