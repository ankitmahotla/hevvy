import { exerciseTypes } from "@/store/exercise";
import { EllipsisVertical, PlusIcon } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

interface SetsProps {
  filteredExercise: any;
  index: number;
}

const renderMeasurementField = (item: string) => {
  return (
    <TextInput
      key={item}
      placeholder={
        item === "REPS"
          ? "0"
          : item === "KG" || item === "+KG" || item === "-KG"
            ? "0 kg"
            : item === "TIME"
              ? "0:00"
              : "0 km"
      }
      className="text-white"
      placeholderTextColor="gray"
      keyboardType="numeric"
      style={{ textAlign: "center" }}
    />
  );
};

export const Sets = ({ filteredExercise, index }: SetsProps) => {
  const exerciseType = exerciseTypes.find(
    (item) => item.id === filteredExercise.exerciseTypeId,
  );
  if (!exerciseType) {
    console.error("Exercise type not found.");
    return null;
  }
  const setType = exerciseType.properties;

  const propertyWidth = 70 / setType.length;

  return (
    <View key={filteredExercise.name} className="mb-8">
      <View className="flex-row items-center justify-between pb-2">
        <Text className="text-blue-500 text-xl">{filteredExercise.name}</Text>
        <EllipsisVertical size={18} color="white" />
      </View>

      {/* Headers row */}
      <View className="flex-row items-center pt-2">
        <View style={{ width: "20%" }}>
          <Text className="text-zinc-300">SETS</Text>
        </View>

        {/* Dynamic property headers */}
        <View className="flex-row" style={{ width: "70%" }}>
          {setType.map((item) => (
            <View key={item} style={{ width: `${propertyWidth}%` }}>
              <Text className="text-zinc-300 text-center">{item}</Text>
            </View>
          ))}
        </View>

        <View style={{ width: "10%", alignItems: "center" }}>
          <Text className="text-zinc-300">✅</Text>
        </View>
      </View>

      {/* Set data row */}
      <View className="flex-row items-center pt-4">
        <View style={{ width: "20%" }}>
          <Text className="text-white">{index + 1}</Text>
        </View>

        {/* Dynamic input fields */}
        <View className="flex-row" style={{ width: "70%" }}>
          {setType.map((item) => (
            <View key={item} style={{ width: `${propertyWidth}%` }}>
              {renderMeasurementField(item)}
            </View>
          ))}
        </View>

        <View style={{ width: "10%", alignItems: "center" }}>
          <Pressable>
            <Text>☑️</Text>
          </Pressable>
        </View>
      </View>

      <Pressable className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-6">
        <PlusIcon size={22} color="white" />
        <Text className="text-lg font-medium text-white">Add Set</Text>
      </Pressable>
    </View>
  );
};
