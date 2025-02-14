import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

/* 启动页 */
SplashScreen.preventAutoHideAsync();

/* 根路由 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    /* 主题 Provider */
    <ThemeProvider value={theme}>
      {/* 声明可跳转的路由栈 */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="animate/carousel" />
        <Stack.Screen name="animate/panRespnder-drag" />
        <Stack.Screen name="animate/enter-animated" />
        <Stack.Screen name="gesture/draggable" />
        <Stack.Screen name="gesture/progress" />
        <Stack.Screen name="gesture/swiper" />
        <Stack.Screen name="link/index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* 状态栏 */}
      <StatusBar style="auto" animated />
    </ThemeProvider>
  );
}
