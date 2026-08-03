import React from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface SOSButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  onPress: () => void;
  isLoading?: boolean;
}

export function SOSButton({
  label,
  onPress,
  isLoading = false,
  isDisabled = false,
  className,
  children,
  ...props
}: SOSButtonProps) {
  const disabled = isLoading || isDisabled;
  const content = children ?? label;

  return (
    <Button
      variant="destructive"
      className={cn("h-24 w-24 rounded-full bg-red-500 shadow-lg", className)}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner />
      ) : typeof content === "string" ? (
        <ButtonText className="text-lg font-bold text-white">
          {content}
        </ButtonText>
      ) : (
        content
      )}
    </Button>
  );
}
