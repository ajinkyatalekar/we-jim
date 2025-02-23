import { router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/context/auth";

export default function Register() {
  const { signUp } = useAuth();
  const {
    errors: { registration: errors },
    validateRegistrationForm,
    clearRegistrationErrors,
  } = useAuthStore();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    clearRegistrationErrors();
    if (!validateRegistrationForm(form)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(form.email, form.password, form.first_name, form.last_name);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.replace("/login");
  };

  return (
    <ScrollView className="h-full bg-background">
      <SafeAreaView className="mx-6">
        <View className="mt-[50]" />

        <Header title="Register" />
        <Text className="text-lg text-primary mt-1">
          Let's start tracking workouts!
        </Text>

        <View className="justify-between flex-row gap-4">
          <CustomInput
            title="First Name*"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e })}
            containerStyles="mt-5 flex-1"
            error={errors.first_name}
          />

          <CustomInput
            title="Last Name*"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e })}
            containerStyles="mt-5 flex-1"
            error={errors.last_name}
          />
        </View>

        <CustomInput
          title="Email*"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e })}
          containerStyles="mt-5"
          keyboardType={"email-address"}
          error={errors.email}
        />

        <CustomInput
          title="Password*"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e })}
          containerStyles="mt-5"
          hidden
          error={errors.password}
        />
        <CustomInput
          title="Confirm Password*"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e })}
          containerStyles="mt-5"
          hidden
          error={errors.confirmPassword}
        />

        <CustomButton
          title="Register"
          handlePress={handleRegister}
          containerStyles="mt-7 w-full"
          disabled={isSubmitting}
        />

        <View className="items-center">
          <Text className="text-lg text-gray-100 mt-4">
            Already have an account? {}
            <Text
              className="text-lg text-secondary-100 rounded-md"
              onPress={() => handleLogin()}
              disabled={isSubmitting}
            >
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
