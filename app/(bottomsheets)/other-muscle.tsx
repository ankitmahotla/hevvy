import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

interface MuscleGroup {
  id: number;
  name: string;
}

const muscleGroups: MuscleGroup[] = [
  { id: 1, name: "Abdominals" },
  { id: 2, name: "Abductors" },
  { id: 3, name: "Adductors" },
  { id: 4, name: "Biceps" },
  { id: 5, name: "Calves" },
  { id: 6, name: "Cardio" },
  { id: 7, name: "Chest" },
  { id: 8, name: "Forearms" },
  { id: 9, name: "Full Body" },
  { id: 10, name: "Glutes" },
  { id: 11, name: "Hamstrings" },
  { id: 12, name: "Lats" },
  { id: 13, name: "Lower Back" },
  { id: 14, name: "Neck" },
  { id: 15, name: "Quadriceps" },
  { id: 16, name: "Shoulders" },
  { id: 17, name: "Traps" },
  { id: 18, name: "Triceps" },
  { id: 19, name: "Upper Back" },
  { id: 20, name: "Other" },
];

interface ListItemProps {
  item: MuscleGroup;
  setSelectedMuscleGroups: React.Dispatch<React.SetStateAction<MuscleGroup[]>>;
}

const ListItem = ({ item, setSelectedMuscleGroups }: ListItemProps) => {
  const [isChecked, setChecked] = useState(false);

  const handleValueChange = () => {
    setChecked((prev) => !prev);
    setSelectedMuscleGroups((prev) =>
      isChecked
        ? prev.filter((muscleGroup: MuscleGroup) => muscleGroup.id !== item.id)
        : [...prev, item],
    );
  };

  return (
    <Pressable onPress={handleValueChange}>
      <View className="flex-row items-center justify-between py-3 border-b-[0.5px] border-b-zinc-400">
        <Text className="text-white text-lg font-medium">{item.name}</Text>
        <Checkbox
          value={isChecked}
          onValueChange={handleValueChange}
          color={isChecked ? "#3b82f6" : undefined}
        />
      </View>
    </Pressable>
  );
};

export default function OtherMuscleGroup() {
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >([]);
  console.log(selectedMuscleGroups);
  return (
    <View className="relative px-4 py-3">
      <View className="flex-row items-center justify-center gap-3 py-4">
        <Text className="text-white text-lg font-medium text-center">
          Secondary Muscle Group
        </Text>
      </View>
      <View className="flex-row gap-3 items-center px-3 py-2 bg-zinc-800 rounded-lg my-4">
        <SearchIcon size={20} color="#71717a" />
        <TextInput
          placeholder="Search muscle"
          placeholderTextColor={"#71717a"}
        />
      </View>
      <View className="absolute bottom-40 left-0 right-0 z-10 mx-3">
        <Pressable
          onPress={() => {
            const addedMuscleGroups = selectedMuscleGroups
              .map((muscleGroup) => muscleGroup.name)
              .join(", "); // Join names with a comma
            router.setParams({
              addedMuscleGroups,
            });
            router.back(); // Navigate back after setting params
          }}
          className="bg-blue-500 rounded-lg p-3"
        >
          <Text className="text-lg text-white text-center font-medium">
            Update Muscle Group(s)
          </Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={muscleGroups}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            setSelectedMuscleGroups={setSelectedMuscleGroups}
          />
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
}
