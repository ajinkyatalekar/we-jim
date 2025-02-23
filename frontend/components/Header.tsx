import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function Header({title, hideBack}: {title: string, hideBack?: boolean}) {
  const router = useRouter()

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <View className="flex-row items-center gap-2 pb-2">
      {!hideBack && (
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
      <Text className="text-4xl text-primary font-pbold pt-3">
        {title}
      </Text>
    </View>
  );
}