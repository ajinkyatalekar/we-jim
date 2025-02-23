import { View, Text, Button } from "react-native";
import { useAuth } from "@/context/auth";

export default function Home() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}