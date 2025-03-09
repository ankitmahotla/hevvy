import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Dumbbell } from "lucide-react-native";
import { GoogleLogo } from "@/svg-imports";

export default function AuthHome() {
  return (
    <View className="flex-1 pt-16 px-10">
      <Text className="text-white text-2xl font-medium text-center mt-6">
        Hevvy
      </Text>
      <View className="h-[75%] items-center justify-center">
        <Dumbbell size={120} color="white" />
      </View>
      <View className="flex-col gap-4 items-center justify-center pb-6">
        <Pressable className="w-full flex-row gap-4 items-center justify-center bg-white px-3 py-2 rounded-lg">
          <GoogleLogo width={20} height={20} />
          <Text className="text-lg text-center">Sign up with Google</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/sign-up")}
          className="w-full bg-blue-500 px-3 py-2 rounded-lg"
        >
          <Text className="text-lg text-white text-center">
            Sign up with Email
          </Text>
        </Pressable>
        <Text className="text-white text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </Text>
      </View>
    </View>
  );
}
