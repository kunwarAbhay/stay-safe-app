import React, { memo, useCallback } from "react";
import { Tabs } from "expo-router";
import { View, Platform, Pressable, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Home,
  UserCheck,
  MapPin,
  PhoneCall,
  LucideIcon,
} from "lucide-react-native";

// ---------------------------------------------------------------------------
// Design tokens — single source of truth for the tab bar's visual language.
// ---------------------------------------------------------------------------
const COLORS = {
  barBackground: "#16151A",
  barBorder: "rgba(255, 255, 255, 0.08)",
  activeBackground: "#FFFFFF",
  activeIcon: "#16151A",
  inactiveIcon: "#9E9CA5",
} as const;

const LAYOUT = {
  barHeight: 66,
  barRadius: 38,
  barHorizontalInset: 16,
  activeIconSize: 48,
  activeIconRadius: 24,
  iconSize: 22,
  webBottomMargin: 20,
  nativeBottomInsetPadding: 8,
  nativeMinBottomMargin: 16,
} as const;

// ---------------------------------------------------------------------------
// Tab configuration — data, not JSX. Adding a tab means editing only this.
// ---------------------------------------------------------------------------
interface TabItemConfig {
  name: string;
  title: string;
  Icon: LucideIcon;
  fillActive?: boolean;
}

const TAB_ITEMS: readonly TabItemConfig[] = [
  { name: "index", title: "Home", Icon: Home, fillActive: true },
  { name: "tracker", title: "Tracker", Icon: MapPin },
  { name: "contacts", title: "Contacts", Icon: UserCheck },
  { name: "helpline", title: "Helpline", Icon: PhoneCall },
];

// ---------------------------------------------------------------------------
// TabIcon — the only place that knows how focused/unfocused icons look.
// ---------------------------------------------------------------------------
interface TabIconProps {
  Icon: LucideIcon;
  focused: boolean;
  fillActive?: boolean;
}

const TabIcon = memo(({ Icon, focused, fillActive }: TabIconProps) => (
  <View
    style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}
  >
    <Icon
      size={LAYOUT.iconSize}
      color={focused ? COLORS.activeIcon : COLORS.inactiveIcon}
      fill={focused && fillActive ? COLORS.activeIcon : "none"}
    />
  </View>
));
TabIcon.displayName = "TabIcon";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getBottomMargin(safeAreaBottom: number): number {
  if (Platform.OS === "web") return LAYOUT.webBottomMargin;
  return Math.max(
    safeAreaBottom + LAYOUT.nativeBottomInsetPadding,
    LAYOUT.nativeMinBottomMargin,
  );
}

// ---------------------------------------------------------------------------
// TabBarButton — extracted so each button's press handlers aren't redefined
// inline inside the parent's map callback (clarity, not a perf necessity here).
// ---------------------------------------------------------------------------
interface TabBarButtonProps {
  isFocused: boolean;
  label?: string;
  testID?: string;
  onPress: () => void;
  onLongPress: () => void;
  renderIcon: (focused: boolean) => React.ReactNode;
}

const TabBarButton = memo(
  ({
    isFocused,
    label,
    testID,
    onPress,
    onLongPress,
    renderIcon,
  }: TabBarButtonProps) => (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabPressable}
    >
      {renderIcon(isFocused)}
    </Pressable>
  ),
);
TabBarButton.displayName = "TabBarButton";

// ---------------------------------------------------------------------------
// CustomTabBar
// ---------------------------------------------------------------------------
function CustomTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const bottomMargin = getBottomMargin(insets.bottom);

  const handlePress = useCallback(
    (routeKey: string, routeName: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: "tabPress",
        target: routeKey,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  const handleLongPress = useCallback(
    (routeKey: string) => {
      navigation.emit({ type: "tabLongPress", target: routeKey });
    },
    [navigation],
  );

  return (
    <View style={[styles.tabBarContainer, { bottom: bottomMargin }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TabBarButton
            key={route.key}
            isFocused={isFocused}
            label={options.tabBarAccessibilityLabel ?? options.title}
            testID={options.tabBarButtonTestID}
            onPress={() => handlePress(route.key, route.name, isFocused)}
            onLongPress={() => handleLongPress(route.key)}
            renderIcon={(focused) =>
              options.tabBarIcon?.({
                focused,
                color: "",
                size: LAYOUT.iconSize,
              })
            }
          />
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// TabLayout
// ---------------------------------------------------------------------------
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      {TAB_ITEMS.map(({ name, title, Icon, fillActive }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={Icon} focused={focused} fillActive={fillActive} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: LAYOUT.barHorizontalInset,
    right: LAYOUT.barHorizontalInset,
    height: LAYOUT.barHeight,
    borderRadius: LAYOUT.barRadius,
    backgroundColor: COLORS.barBackground,
    borderWidth: 1,
    borderColor: COLORS.barBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  tabPressable: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconContainer: {
    width: LAYOUT.activeIconSize,
    height: LAYOUT.activeIconSize,
    borderRadius: LAYOUT.activeIconRadius,
    backgroundColor: COLORS.activeBackground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  inactiveIconContainer: {
    width: LAYOUT.activeIconSize,
    height: LAYOUT.activeIconSize,
    justifyContent: "center",
    alignItems: "center",
  },
});
