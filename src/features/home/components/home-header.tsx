import React from "react";
import { Pressable } from "react-native";
import { useUser } from "@/src/features/auth/hooks/use-user";
import { useRouter } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Bell } from "lucide-react-native";
import { FALLBACK_PROFILE_IMG_URL } from "@/src/config/constants";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";

export const HomeHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof ScreenHeader>) => {
  const { user } = useUser();
  const router = useRouter();

  const userName = (user?.unsafeMetadata?.fullname as string) || "User";
  const userInitial = userName.at(0)?.toUpperCase() || "U";
  const userImage = user?.imageUrl || FALLBACK_PROFILE_IMG_URL;

  const handleGoToAccount = () => {
    router.push("/account");
  };

  return (
    <ScreenHeader className={className} {...props}>
      <ScreenHeader.Left>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open Account"
          onPress={handleGoToAccount}
        >
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarFallbackText>{userInitial}</AvatarFallbackText>
            <AvatarImage source={{ uri: userImage }} />
          </Avatar>
        </Pressable>
      </ScreenHeader.Left>
      <ScreenHeader.Content>
        <ScreenHeader.Title>Good day, {userName}</ScreenHeader.Title>
        <ScreenHeader.Subtitle>
          Stay connected with trusted contacts
        </ScreenHeader.Subtitle>
      </ScreenHeader.Content>
      <ScreenHeader.Right>
        <Bell size={30} />
      </ScreenHeader.Right>
    </ScreenHeader>
  );
};
