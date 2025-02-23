import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function Header({title}: {title: string}) {
  const router = useRouter()

  return (
    <View className="flex-row items-center gap-2 pb-2">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text className="text-4xl text-primary font-pbold pt-3">
        {title}
      </Text>
    </View>
  );
}