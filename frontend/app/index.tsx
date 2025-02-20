import api from "@/config/api";
import { Button, Text, View } from "react-native";
import "@/global.css"

const signup = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api.API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.detail);
    }

    return data;
  } catch (error) {
    console.error('SupaBase Error:', error);
    throw error;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.detail);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error('SupaBase Error:', error);
    throw error;
  }
};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Signup" onPress={() => signup("ajinkya.talekar123@gmail.com", "password")} />
      <Button title="Login" onPress={() => login("ajinkya.talekar123@gmail.com", "password")} />
    </View>
  );
}
