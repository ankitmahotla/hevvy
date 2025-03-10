import { StackHeader } from "@/components/stack-header";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUp() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View className="flex-1 pt-12 px-2">
        <StackHeader title="Sign Up" />
        <View className="px-6">
          <View className="gap-8 mt-10">
            <View className="border-b border-b-zinc-400">
              <Text className="text-lg text-white">Email</Text>
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
                className="text-white [rounded-lg px-2 py-2 mt-1"
                placeholderTextColor="gray"
                secureTextEntry={true}
              />
            </View>
            <View className="border-b border-b-zinc-400">
              <Text className="text-lg text-white">Username</Text>
              <TextInput
                placeholder="username"
                className="text-white rounded-lg border-b border-b-zinc-400 px-2 py-2 mt-1"
                placeholderTextColor="gray"
              />
            </View>
          </View>

          <Pressable className="w-full bg-zinc-400 px-3 py-2 rounded-lg mt-10">
            <Text className="text-lg text-center text-white">Continue</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
