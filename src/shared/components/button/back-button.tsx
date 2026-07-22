import React from "react";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { Button, ButtonIcon } from "@/components/ui/button";

export const BackButton = ({
  className,
  onPress,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const router = useRouter();

  const handlePress = (e: any) => {
    if (onPress) {
      onPress(e);
    } else {
      router.back();
    }
  };

  return (
    <Button
      size="default"
      variant="outline"
      onPress={handlePress}
      className={cn("rounded-full p-2", className)}
      {...props}
    >
      <ButtonIcon as={ArrowLeftIcon} className="text-foreground" />
    </Button>
  );
};
