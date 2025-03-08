import { DumbbellIcon } from "lucide-react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface AppHeaderProps {
  title: String;
}

export const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <ThemedView className="flex-row items-center gap-4">
      <DumbbellIcon size={30} color="white" />
      <ThemedText className="text-2xl font-medium">{title}</ThemedText>
    </ThemedView>
  );
};
