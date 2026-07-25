import React, { memo } from "react";
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

interface TabItemConfig {
  name: string;
  title: string;
  Icon: LucideIcon;
  fillActive?: boolean;
}

const TAB_ITEMS: readonly TabItemConfig[] = [
  {
    name: "index",
    title: "Home",
    Icon: Home,
    fillActive: true,
  },
  {
    name: "tracker",
    title: "Tracker",
    Icon: MapPin,
  },
  {
    name: "contacts",
    title: "Contacts",
    Icon: UserCheck,
  },
  {
    name: "helpline",
    title: "Helpline",
    Icon: PhoneCall,
  },
];

interface TabIconProps {
  Icon: LucideIcon;
  focused: boolean;
  fillActive?: boolean;
}

const TabIcon = memo(({ Icon, focused, fillActive }: TabIconProps) => {
  if (focused) {
    return (
      <View style={styles.activeIconContainer}>
        <Icon
          size={22}
          color="#16151A"
          fill={fillActive ? "#16151A" : "none"}
        />
      </View>
    );
  }

  return (
    <View style={styles.inactiveIconContainer}>
      <Icon size={22} color="#9E9CA5" />
    </View>
  );
});

function CustomTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const bottomMargin =
    Platform.OS === "web" ? 20 : Math.max(insets.bottom + 8, 16);

  return (
    <View style={[styles.tabBarContainer, { bottom: bottomMargin }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabPressable}
          >
            {options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? "#FFFFFF" : "#9E9CA5",
              size: 22,
            })}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {TAB_ITEMS.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                Icon={item.Icon}
                focused={focused}
                fillActive={item.fillActive}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 66,
    borderRadius: 38,
    backgroundColor: "#16151A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  inactiveIconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
