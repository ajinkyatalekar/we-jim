import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { parseSupabaseUrl } from "@/utils/url-parser";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { usePasswordResetStore } from "@/store/passwordResetStore";

export default function PasswordReset() {
  const { user, loginWithToken, resetPassword } = useAuth();
  const {
    password,
    confirmPassword,
    errors,
    setPassword,
    setConfirmPassword,
    validateForm,
  } = usePasswordResetStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const { error } = await resetPassword(password);
    if (error) {
      console.error(error);
    } else {
      router.replace("/");
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    router.replace("/");
  };

  const url = Linking.useURL();
  useEffect(() => {
    setIsLoading(true);
    const tryLogin = async () => {
      if (url) {
        const parsedUrl = parseSupabaseUrl(url);
        if (parsedUrl.queryParams?.access_token) {
          try {
            await loginWithToken({
              access_token: parsedUrl.queryParams.access_token as string,
              refresh_token: parsedUrl.queryParams.refresh_token as string,
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    tryLogin();
    setIsLoading(false);
  }, [url]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !user) {
    return (
      <SafeAreaView className="bg-background h-full px-6">
        <View className="mt-[50]" />

        <Header title="Something went wrong!" hideBack />
        <Text className="text-lg text-primary mt-1">
          Please go back and try again.
        </Text>

        <CustomButton
          title="Go Back"
          handlePress={() => handleBack()}
          containerStyles="mt-7 w-full"
        />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="h-full bg-background">
      <SafeAreaView className="mx-6">
        <View className="mt-[50]" />

        <Header title="Reset Password" hideBack />
        <Text className="text-lg text-primary mt-1">
          Choose a new password for your account.
        </Text>

        <CustomInput
          title="New Password*"
          value={password}
          onChange={setPassword}
          containerStyles="mt-5"
          hidden
          error={errors.password}
        />

        <CustomInput
          title="Confirm New Password*"
          value={confirmPassword}
          onChange={setConfirmPassword}
          containerStyles="mt-5"
          hidden
          error={errors.confirmPassword}
        />

        <CustomButton
          title="Update Password"
          handlePress={handleSubmit}
          containerStyles="mt-7 w-full"
          disabled={isSubmitting}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
