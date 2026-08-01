import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ScreenLayoutProps extends React.ComponentProps<
  typeof ScrollView
> {
  isTabScreen?: boolean;
  scrollable?: boolean;
  useSafeArea?: boolean;
  useKeyboardAvoiding?: boolean;
  keyboardBehavior?: "padding" | "height" | "position";
  /** Custom safe area edges to apply when useSafeArea is true. */
  edges?: React.ComponentProps<typeof SafeAreaView>["edges"];
}

export interface ScreenLayoutContentProps extends React.ComponentProps<
  typeof ScrollView
> {
  isTabScreen?: boolean;
  scrollable?: boolean;
}

export interface ScreenLayoutFloatingProps {
  children?: React.ReactNode;
}

const ScreenLayoutContent = ({
  isTabScreen = false,
  scrollable = true,
  className,
  children,
  ...props
}: ScreenLayoutContentProps) => {
  const containerPaddingClass = cn("px-5 py-6", isTabScreen ? "pb-30" : "pb-8");

  if (!scrollable) {
    return (
      <Box
        className={cn("flex-1 bg-background", containerPaddingClass, className)}
        {...props}
      >
        {children}
      </Box>
    );
  }

  return (
    <ScrollView
      className={cn("flex-1 bg-background", containerPaddingClass, className)}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
ScreenLayoutContent.isScreenLayoutContent = true;

const ScreenLayoutFloating = ({ children }: ScreenLayoutFloatingProps) => {
  return <>{children}</>;
};
ScreenLayoutFloating.isScreenLayoutFloating = true;

export const ScreenLayout = ({
  isTabScreen = false,
  scrollable = true,
  useSafeArea = true,
  useKeyboardAvoiding = false,
  keyboardBehavior = Platform.OS === "ios" ? "padding" : "height",
  edges,
  className,
  children,
  ...props
}: ScreenLayoutProps) => {
  let hasCompoundComponents = false;
  const contentChildren: React.ReactNode[] = [];
  const floatingChildren: React.ReactNode[] = [];
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as any;
      if (
        childType === ScreenLayoutContent ||
        childType?.isScreenLayoutContent
      ) {
        hasCompoundComponents = true;
        contentChildren.push(child);
      } else if (
        childType === ScreenLayoutFloating ||
        childType?.isScreenLayoutFloating
      ) {
        hasCompoundComponents = true;
        floatingChildren.push(child);
      } else {
        otherChildren.push(child);
      }
    } else {
      otherChildren.push(child);
    }
  });

  const body = hasCompoundComponents ? (
    <Box className="flex-1 relative bg-background">
      {contentChildren}
      {otherChildren}
      {floatingChildren}
    </Box>
  ) : (
    <Box className="flex-1 relative bg-background">
      <ScreenLayoutContent
        isTabScreen={isTabScreen}
        scrollable={scrollable}
        className={className}
        {...props}
      >
        {children}
      </ScreenLayoutContent>
    </Box>
  );

  let result = body;

  if (useKeyboardAvoiding) {
    result = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardBehavior}
        className="flex-1"
      >
        {result}
      </KeyboardAvoidingView>
    );
  }

  if (useSafeArea) {
    result = (
      <SafeAreaView
        style={{ flex: 1 }}
        className="flex-1 bg-background"
        edges={edges}
      >
        {result}
      </SafeAreaView>
    );
  }

  return result;
};

ScreenLayout.Content = ScreenLayoutContent;
ScreenLayout.Floating = ScreenLayoutFloating;
