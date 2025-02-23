import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import CustomButton from "@/components/CustomButton";
import { APP_NAME, LANDING_PAGE_CONTENT as CONTENT } from "@/config/landing-page-content";
import { useRouter } from "expo-router";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    router.push('/login');
    setIsLoading(false);
  }

  const handleRegister = () => {
    setIsLoading(true);
    router.push('/register');
    setIsLoading(false);
  }

  return (
    <ScrollView className="h-full bg-background">
      <SafeAreaView className="ml-[30] mr-[30]">
        <View className="justify-center items-center">
          <Image
            source={require("@/assets/images/landing/landing.png")}
            className="h-[240] w-[240] mb-5 rounded-3xl"
          />
        </View>

        <Text className="text-6xl text-primary font-pbold mb-4">
          Welcome to {}
          <Text className="text-secondary-100">{APP_NAME}</Text>!
        </Text>

        {CONTENT.bulletPoints.map((point, index) => (
          <View key={index} className="flex-row android:mb-5">
            <View className="justify-start mt-1">
              <Image
                source={point.image}
                className="h-[40] w-[40] rounded-3xl mt-2"
              />
            </View>
            <Text className="text-lg text-gray flex-1 ml-[10]">
              <Text className="text-primary text-xl">{point.title}</Text>
              {`\n`}
              {point.description}
              {`\n`}
            </Text>
          </View>
        ))}

        <View className="flex-row gap-4">
          <CustomButton
            title={CONTENT.buttons.login}
            handlePress={handleLogin}
            inverted
            containerStyles="flex-1"
            disabled={isLoading}
          />
          <CustomButton
            title={CONTENT.buttons.register}
            handlePress={handleRegister}
            containerStyles="flex-1"
            disabled={isLoading}
          />
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </ScrollView>
  );
}
