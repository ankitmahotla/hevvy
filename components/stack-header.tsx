import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

interface StackHeaderProps {
  title: String;
}

export const StackHeader = ({ title }: StackHeaderProps) => {
  return (
    <View>
      <Pressable
        className="flex-row items-center gap-4"
        onPress={() => router.back()}
      >
        <ChevronLeft size={20} color="white" />
        <Text className="text-lg text-white font-medium">{title}</Text>
      </Pressable>
    </View>
  );
};
