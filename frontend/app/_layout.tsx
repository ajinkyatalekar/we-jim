import { Stack, SplashScreen, useRouter, useSegments, Slot } from "expo-router";
import { useFonts } from 'expo-font'

import "../global.css";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/auth";
import { UserProvider } from "@/context/user";
function ProtectedRoute() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === '(auth)' || segments[0] === '(landing)';
      
      // If the user is not logged in and not in the auth group, redirect to the landing page
      if (!user && !inAuthGroup) {
        router.replace('/landing');
      // If the user is logged in and in the auth group, redirect to the home page
      } else if (user && inAuthGroup) {
        router.replace('/home');
      }
    }
  }, [user, loading, segments]);

  return (
    <Stack>
      <Stack.Screen name="(landing)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <AuthProvider>
      <UserProvider>
        <ProtectedRoute />
      </UserProvider>
    </AuthProvider>
  );
}
