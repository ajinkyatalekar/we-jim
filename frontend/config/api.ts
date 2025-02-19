import { Platform } from 'react-native';

const ENV = {
  dev: {
    API_URL: Platform.select({
      android: 'http://10.0.2.2:8000',
      ios: 'http://localhost:8000',
      default: 'http://localhost:8000'
    })
  },
  prod: {
    API_URL: 'https://your-production-api.com'
  }
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars();