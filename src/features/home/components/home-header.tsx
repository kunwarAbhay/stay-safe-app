import React from "react";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Bell } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

const loggedInUserName = "Sarah";
("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop");
const loggedInUserProfileImgSrc =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop";

export const HomeHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof HStack>) => {
  return (
    <HStack className="justify-between items-center">
      <HStack space="md" className="gap-3 items-center">
        <Avatar className="w-10 h-10 rounded-full">
          <AvatarFallbackText>{loggedInUserName}</AvatarFallbackText>
          <AvatarImage source={{ uri: loggedInUserProfileImgSrc }} />
        </Avatar>
        <VStack space="xs" className="gap-1">
          <Text className="font-bold text-foreground text-lg">
            Good day, {loggedInUserName}
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
