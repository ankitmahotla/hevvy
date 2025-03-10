import { DumbbellIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface AppHeaderProps {
  title: String;
}

export const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <DumbbellIcon
        size={30}
        color="white"
      />
      <Text className="text-2xl text-white font-medium">{title}</Text>
    </View>
  );
};
