import { Fab, FabIcon } from "@/components/ui/fab";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { MoonIcon, SunIcon } from "@/components/ui/icon";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useFonts } from "expo-font";
import { Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/api/query-client";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { AuthGuard } from "@/src/features/auth/components/AuthGuard";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return <RootLayoutNav />;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<"light" | "dark" | "system">(
    "light",
  );

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode={colorMode}>
              <StatusBar style={colorMode === "dark" ? "light" : "dark"} />
              <AuthGuard>
                <Slot />
                {/* Theme toggle feature */}
                {/* {pathname === '/' && (
              <Fab
                onPress={() =>
                  setColorMode(colorMode === 'dark' ? 'light' : 'dark')
                }
                className="m-6"
                size="lg"
              >
                <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
              </Fab>
            )} */}
              </AuthGuard>
            </GluestackUIProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ClerkProvider>
  );
}
