import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { APP_NAME } from "@/config/landing-page-content";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/context/auth";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {
    errors: { login: errors },
    validateLoginForm,
    clearLoginErrors,
  } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    clearLoginErrors();
    if (!validateLoginForm(form.email, form.password)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      router.dismissAll();
      router.replace("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    router.replace("/password-recovery");
  };

  const handleRegister = async () => {
    router.replace("/register");
  };

  return (
    <ScrollView className="h-full bg-background">
      <SafeAreaView className="mx-6">
        <View className="mt-[50]" />

        <Header title="Login" />
        <Text className="text-lg text-primary mt-1">
          Welcome back to {APP_NAME}!
        </Text>

        <CustomInput
          title="Email*"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e })}
          containerStyles="mt-5"
          error={errors.email}
        />

        <CustomInput
          title="Password*"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e })}
          containerStyles="mt-5"
          error={errors.password}
          hidden
        />
        <View className="items-end">
          <Text className="text-lg text-gray-100 mt-4 mr-2">
            <Text
              onPress={handleForgotPassword}
              className="text-lg text-secondary-100 rounded-md"
              disabled={isSubmitting}
            >
              Forgot Password?
            </Text>
          </Text>
        </View>

        <CustomButton
          title="Log In"
          handlePress={handleLogin}
          containerStyles="mt-7 w-full"
          disabled={isSubmitting}
        />

        <View className="items-center">
          <Text className="text-lg text-gray-100 mt-4">
            Don't have an account? {}
            <Text
              className="text-lg text-secondary-100 rounded-md"
              onPress={handleRegister}
              disabled={isSubmitting}
            >
              Register
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
