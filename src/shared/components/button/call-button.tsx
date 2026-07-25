import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Phone } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { openCallDialer } from "@/src/shared/utils/call";

interface CallButtonProps {
  contactName: string;
  contactNumber: string;
}

export const CallButton = ({
  contactName,
  contactNumber,
  className,
  ...props
}: CallButtonProps & React.ComponentProps<typeof Pressable>) => {
  const handleCallPress = (e: any) => {
    openCallDialer(contactNumber);
  };

  return (
    <Pressable
      className={cn(
        "p-3.25 bg-foreground rounded-full items-center justify-center transition-transform duration-100 shadow-sm",
        className,
      )}
      onPress={handleCallPress}
      aria-label={`Call ${contactName}`}
      {...props}
    >
      <Icon as={Phone} size="md" className="text-background h-5 w-5" />
    </Pressable>
  );
};
