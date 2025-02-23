import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import * as Linking from 'expo-linking';

type Tokens = {
  access_token: string;
  refresh_token: string;
};

type AuthContextType = {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => Promise<any>;
  signOut: () => Promise<void>;
  loginWithToken: (credentials: Tokens) => Promise<void>;
  sendResetPasswordLink: (email: string) => Promise<{ data: any, error: any }>; 
  resetPassword: (password: string) => Promise<{ data: any, error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  loginWithToken: async () => {},
  sendResetPasswordLink: async () => ({ data: null, error: null }),
  resetPassword: async () => ({ data: null, error: null }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const loginWithToken = async ({ access_token, refresh_token }: Tokens) => {
    const signIn = async () => {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      return await supabase.auth.refreshSession();
    };

    const {
      data: { user: supabaseUser },
    } = await signIn();

    setUser(supabaseUser);
  };

  const sendResetPasswordLink = async (email: string) => {
    const resetPasswordURL = Linking.createURL("/password-reset");
  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordURL,
    });
  
    return { data, error };
  
  };

  const resetPassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password
    })

    return { data, error };
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, loginWithToken, sendResetPasswordLink, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
