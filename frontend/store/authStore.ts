import { create } from 'zustand'

interface AuthErrors {
  login: {
    email: string;
    password: string;
  };
  registration: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

interface AuthStore {
  errors: AuthErrors;
  setLoginError: (field: keyof AuthErrors['login'], message: string) => void;
  setRegistrationError: (field: keyof AuthErrors['registration'], message: string) => void;
  clearLoginErrors: () => void;
  clearRegistrationErrors: () => void;
  validateLoginForm: (email: string, password: string) => boolean;
  validateRegistrationForm: (form: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  errors: {
    login: {
      email: '',
      password: '',
    },
    registration: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  },

  setLoginError: (field, message) => 
    set((state) => ({
      errors: {
        ...state.errors,
        login: {
          ...state.errors.login,
          [field]: message,
        },
      },
    })),

  setRegistrationError: (field, message) => 
    set((state) => ({
      errors: {
        ...state.errors,
        registration: {
          ...state.errors.registration,
          [field]: message,
        },
      },
    })),

  clearLoginErrors: () => 
    set((state) => ({
      errors: {
        ...state.errors,
        login: { email: '', password: '' },
      },
    })),

  clearRegistrationErrors: () => 
    set((state) => ({
      errors: {
        ...state.errors,
        registration: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      },
    })),

  validateLoginForm: (email, password) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const store = useAuthStore.getState();

    if (!email) {
      store.setLoginError('email', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      store.setLoginError('email', 'Invalid email format');
      isValid = false;
    }

    if (!password) {
      store.setLoginError('password', 'Password is required');
      isValid = false;
    }

    return isValid;
  },

  validateRegistrationForm: (form) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    const store = useAuthStore.getState();

    if (!form.first_name.trim()) {
      store.setRegistrationError('first_name', 'First name is required');
      isValid = false;
    }

    if (!form.last_name.trim()) {
      store.setRegistrationError('last_name', 'Last name is required');
      isValid = false;
    }

    if (!form.email) {
      store.setRegistrationError('email', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      store.setRegistrationError('email', 'Invalid email format');
      isValid = false;
    }

    if (!form.password) {
      store.setRegistrationError('password', 'Password is required');
      isValid = false;
    } else if (form.password.length < 8) {
      store.setRegistrationError('password', 'Password must be at least 8 characters');
      isValid = false;
    } else if (!passwordRegex.test(form.password)) {
      store.setRegistrationError('password', 'Password must contain at least one letter and one number');
      isValid = false;
    }

    if (!form.confirmPassword) {
      store.setRegistrationError('confirmPassword', 'Please confirm your password');
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      store.setRegistrationError('confirmPassword', 'Passwords do not match');
      isValid = false;
    }

    return isValid;
  },
})); 