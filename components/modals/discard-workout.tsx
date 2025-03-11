import {
  Modal,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";

interface DiscardWorkoutModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const DiscardWorkoutModal = ({
  modalVisible,
  setModalVisible,
}: DiscardWorkoutModalProps) => {
  const handleDiscard = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 40,
          }}
        >
          {/* Modal Content */}
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              className="w-full flex-col items-center justify-center bg-zinc-800 rounded-lg"
              style={{ padding: 20 }}
            >
              <Text className="text-white text-lg font-medium text-center">
                Are you sure you want to discard your workout?
              </Text>
              <Pressable
                onPress={handleDiscard}
                className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-4"
              >
                <Text className="text-red-600 font-medium text-lg">
                  Discard Workout
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="w-full flex-row justify-center items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mt-4"
              >
                <Text className="text-white font-medium text-lg">Cancel</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
