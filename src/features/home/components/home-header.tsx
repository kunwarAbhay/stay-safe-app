import React from "react";
import { Pressable } from "react-native";
import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Bell } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { FALLBACK_PROFILE_IMG_URL } from "@/src/config/constants";

export const HomeHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof HStack>) => {
  const { user } = useUser();
  const router = useRouter();

  const userName = (user?.unsafeMetadata?.fullname as string) || "User";
  
  const userInitial = userName.at(0)?.toUpperCase() || "U";

  const userImage = user?.imageUrl || FALLBACK_PROFILE_IMG_URL;

  return (
    <HStack className="justify-between items-center" {...props}>
      <HStack space="md" className="gap-3 items-center">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open Account"
          onPress={() => router.push("/account")}
        >
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarFallbackText>{userInitial}</AvatarFallbackText>
            <AvatarImage source={{ uri: userImage }} />
          </Avatar>
        </Pressable>
        <VStack space="xs" className="gap-1">
          <Text className="font-bold text-foreground text-lg">
            Good day, {userName}
          </Text>
          <Text className="text-foreground/60 text-xs">
            Stay connected with trusted contacts
          </Text>
        </VStack>
      </HStack>
      <Bell size={30} />
    </HStack>
  );
};
