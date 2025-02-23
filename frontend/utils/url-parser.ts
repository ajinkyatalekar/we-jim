import * as Linking from 'expo-linking';

export const parseSupabaseUrl = (url: string) => {
  let parsedUrl = url;
  if (url.includes("#")) {
    parsedUrl = url.replace("#", "?");
  }

  return Linking.parse(parsedUrl);
};