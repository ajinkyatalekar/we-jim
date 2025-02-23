import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loader() {
  return (
    <SafeAreaView className="bg-background h-full items-center justify-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}
