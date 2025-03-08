import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GoogleLogo } from "@/svg-imports";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ThemedView className="flex-1 pt-12 px-2">
        <ScreenHeader title="Login" />
        <ThemedView className="px-6">
          <ThemedView className="gap-8 mt-10">
            <ThemedView className="border-b border-b-zinc-400">
              <ThemedText className="text-lg">Email or username</ThemedText>
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
                className="text-white rounded-lg px-2 py-2 mt-1"
                placeholderTextColor="gray"
                secureTextEntry={true}
              />
            </ThemedView>
          </ThemedView>
          <Text className="mt-8 text-center text-blue-500">
            Forgot Password?
          </Text>

          <Pressable className="w-full bg-zinc-400 px-3 py-2 rounded-lg mt-8">
            <ThemedText className="text-lg text-center">Login</ThemedText>
          </Pressable>

          <ThemedView className="flex-row justify-center items-center gap-4 mt-4">
            <View className="flex-1 border border-zinc-400"></View>
            <ThemedText className="text-lg">or</ThemedText>
            <View className="flex-1 border border-zinc-400"></View>
          </ThemedView>

          <ThemedView className="flex-col gap-4 items-center justify-center pb-6 mt-8">
            <Pressable className="w-full flex-row gap-4 items-center justify-center bg-white px-3 py-2 rounded-lg">
              <GoogleLogo width={20} height={20} />
              <Text className="text-lg text-center">Sign In with Google</Text>
            </Pressable>
            <ThemedText className="text-base">
              Create a new account?{" "}
              <Link href="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
