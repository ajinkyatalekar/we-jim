import { View, Text, Button } from "react-native";
import { useAuth } from "@/context/auth";
import { useUser } from "@/context/user";

export default function Home() {
  const { signOut } = useAuth();
  const { profile } = useUser();
  
  return (
    <View>
      <Text>Home</Text>
      <Text>{profile?.display_name}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}