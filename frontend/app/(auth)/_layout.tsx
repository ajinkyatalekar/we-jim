import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        // header: () => (
        //   <SafeAreaView className="mx-4 mt-4 flex-row items-center justify-left -mb-2 bg-background">
        //     <TouchableOpacity onPress={() => router.back()}>
        //       <Ionicons name="chevron-back" size={24} color="black" className="pr-2 mr-2" />
        //     </TouchableOpacity>
        //     <Text className="text-3xl font-bold">Login</Text>
        //   </SafeAreaView>
        // ),
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="password-recovery"
        options={{
          title: 'Password Recovery',
        }}
      />
      <Stack.Screen
        name="password-reset"
        options={{
          title: 'Password Reset',
        }}
      />
    </Stack>
  );
}