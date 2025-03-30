import { router } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import { muscles } from "@/constants/muscles";
import { createExerciseAtom } from "@/store/exercise";
import { useAtom } from "jotai";
import { useDebounce } from "@uidotdev/usehooks";

interface MuscleGroup {
  id: number;
  name: string;
}

interface ListItemProps {
  item: MuscleGroup;
  selectedMuscleGroups: MuscleGroup[];
  setSelectedMuscleGroups: React.Dispatch<React.SetStateAction<MuscleGroup[]>>;
}

const ListItem = ({
  item,
  selectedMuscleGroups,
  setSelectedMuscleGroups,
}: ListItemProps) => {
  const isChecked = selectedMuscleGroups.some(
    (muscle) => muscle.id === item.id,
  );

  const handleValueChange = () => {
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
  const [exercise, setExercise] = useAtom(createExerciseAtom);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >(
    // Initialize with existing muscle groups from the atom
    muscles.filter((muscle) =>
      exercise.otherMuscleGroups.includes(muscle.name),
    ),
  );
  const [searchInput, setSearchInput] = useState("");
  const [muscleList, setMuscleList] = useState(muscles);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    const filterMuscles = () => {
      if (debouncedSearchInput) {
        setMuscleList(
          muscles.filter((muscle) =>
            muscle.name.includes(debouncedSearchInput),
          ),
        );
      } else {
        setMuscleList(muscles);
      }
    };
    filterMuscles();
  }, [debouncedSearchInput]);

  const handleOtherMuscleGroupSelect = () => {
    router.back();
    setExercise({
      ...exercise,
      otherMuscleGroups: selectedMuscleGroups.map((muscle) => muscle.name),
    });
  };

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
          value={searchInput}
          onChangeText={handleInputChange}
          placeholder="Search muscle"
          placeholderTextColor={"#71717a"}
          className="text-white"
        />
      </View>
      <View className="absolute bottom-40 left-0 right-0 z-10 mx-3">
        <Pressable
          onPress={handleOtherMuscleGroupSelect}
          className="bg-blue-500 rounded-lg p-3"
        >
          <Text className="text-lg text-white text-center font-medium">
            Update Muscle Group(s)
          </Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={muscleList}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            selectedMuscleGroups={selectedMuscleGroups}
            setSelectedMuscleGroups={setSelectedMuscleGroups}
          />
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
}
