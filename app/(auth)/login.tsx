import { StackHeader } from "@/components/stack-header";
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
      <View className="flex-1 pt-12 px-2">
        <StackHeader title="Login" />
        <View className="px-6">
          <View className="gap-8 mt-10">
            <View className="border-b border-b-zinc-400">
              <Text className="text-lg text-white">Email or username</Text>
              <TextInput
                placeholder="johndoe@gmail.com"
                className="text-white rounded-lg border-b border-b-zinc-400 px-2 py-2 mt-1"
                placeholderTextColor="gray"
              />
            </View>
            <View className="border-b border-b-zinc-400">
              <Text className="text-lg text-white">Password</Text>
              <TextInput
                placeholder="minimum 6 characters"
                className="text-white rounded-lg px-2 py-2 mt-1"
                placeholderTextColor="gray"
                secureTextEntry={true}
              />
            </View>
          </View>
          <Text className="mt-8 text-center text-blue-500">
            Forgot Password?
          </Text>

          <Pressable className="w-full bg-zinc-400 px-3 py-2 rounded-lg mt-8">
            <Text className="text-lg text-center text-white">Login</Text>
          </Pressable>

          <View className="flex-row justify-center items-center gap-4 mt-4">
            <View className="flex-1 border border-zinc-400"></View>
            <Text className="text-lg text-white">or</Text>
            <View className="flex-1 border border-zinc-400"></View>
          </View>

          <View className="flex-col gap-4 items-center justify-center pb-6 mt-8">
            <Pressable className="w-full flex-row gap-4 items-center justify-center bg-white px-3 py-2 rounded-lg">
              <GoogleLogo width={20} height={20} />
              <Text className="text-lg text-center">Sign In with Google</Text>
            </Pressable>
            <Text className="text-base text-white">
              Create a new account?{" "}
              <Link href="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
