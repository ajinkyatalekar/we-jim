import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import { useAuth } from "@/context/auth";
// import { sendResetPasswordLink } from "@/api/auth";

export default function ForgotPassword() {
  const { sendResetPasswordLink } = useAuth();

  const [form, setForm] = useState({
    email: "tester@gmail.com",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setIsSubmitting(true);
    try {
      const { error } = await sendResetPasswordLink(form.email);
      if (error) {
        console.error("Password reset error:", error.message);
      } else {
        // Success
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="h-full bg-background">
      <SafeAreaView className="mx-6">
        <View className="mt-[50]" />

        <Header title="Forgot Password" />
        <Text className="text-lg text-primary mt-1">
          Need help recovering your account?
        </Text>

        <CustomInput
          title="Email*"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e });
            setEmailError("");
          }}
          containerStyles="mt-5"
          error={emailError}
        />

        <CustomButton
          title="Send Reset Link"
          handlePress={handleSubmit}
          containerStyles="mt-7 w-full"
          disabled={isSubmitting}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
