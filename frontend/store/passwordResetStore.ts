import { create } from 'zustand';

interface PasswordResetState {
  password: string;
  confirmPassword: string;
  errors: {
    password?: string;
    confirmPassword?: string;
  };
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export const usePasswordResetStore = create<PasswordResetState>((set, get) => ({
  password: '',
  confirmPassword: '',
  errors: {},

  setPassword: (password) => {
    set({ password, errors: {} });
  },

  setConfirmPassword: (confirmPassword) => {
    set({ confirmPassword, errors: {} });
  },

  validateForm: () => {
    const { password, confirmPassword } = get();
    const errors: { password?: string; confirmPassword?: string } = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    let isValid = true;

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Password must contain at least one letter and one number';
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    set({ errors });
    return isValid;
  },

  resetForm: () => {
    set({ password: '', confirmPassword: '', errors: {} });
  },
}));