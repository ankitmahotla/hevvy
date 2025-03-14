import { Text, TextInput, View } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 pt-6 px-4">
      <TextInput
        placeholder="Ankit Mahotla"
        placeholderTextColor={"#a1a1aa"}
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "white",
        }}
      />
      <View className="flex-row items-center justify-between mt-4">
        <View>
          <Text className="text-zinc-300 text-sm">Workouts</Text>
          <Text className="text-white text-lg">1200</Text>
        </View>
        {/* <View>
          <Text className="text-zinc-300 text-sm">Volume</Text>
          <Text className="text-white text-lg">0 kg</Text>
        </View>
        <View>
          <Text className="text-zinc-300 text-sm">Sets</Text>
          <Text className="text-white text-lg">0</Text>
        </View> */}
      </View>
    </View>
  );
}
