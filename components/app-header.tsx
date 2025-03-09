import { DumbbellIcon } from "lucide-react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";

interface AppHeaderProps {
  title: String;
}

export const AppHeader = ({ title }: AppHeaderProps) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView className="flex-row items-center gap-4">
      <DumbbellIcon
        size={30}
        color={colorScheme === "dark" ? "white" : "black"}
      />
      <ThemedText className="text-2xl font-medium">{title}</ThemedText>
    </ThemedView>
  );
};
