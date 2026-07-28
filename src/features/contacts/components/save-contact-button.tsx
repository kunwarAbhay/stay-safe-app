import React from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export const SaveContactButton = ({
  onPress,
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Box className="absolute bottom-6 left-5 right-5 z-20">
      <Button
        onPress={onPress}
        className={cn("rounded-full py-4 w-full shadow-lg", className)}
        {...props}
      >
        <ButtonText className="text-lg font-bold">Save Contact</ButtonText>
      </Button>
    </Box>
  );
};
