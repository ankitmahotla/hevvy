import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

interface StackHeaderProps {
  title: String;
  children?: React.ReactNode;
}

export const StackHeader = ({ title, children }: StackHeaderProps) => {
  return (
    <View
      className="flex-row items-center justify-between"
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#a1a1aa",
        paddingBottom: 10,
      }}
    >
      <View className="flex-row items-center gap-4">
        <Pressable onPress={() => router.back()}>
          <ChevronLeft size={20} color="white" />
        </Pressable>
        <Text className="text-lg text-white font-medium">{title}</Text>
      </View>
      {children}
    </View>
  );
};
