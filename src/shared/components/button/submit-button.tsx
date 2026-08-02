import React from "react";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  children?: React.ReactNode;
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

export function SubmitButton({
  children,
  label,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  ...props
}: SubmitButtonProps) {
  const disabled = isLoading || isDisabled;
  const content = children ?? label;

  return (
    <Button
      size="lg"
      className={cn("rounded-full bg-primary-500 mt-4", className)}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="white" />
      ) : typeof content === "string" ? (
        <ButtonText>{content}</ButtonText>
      ) : (
        content
      )}
    </Button>
  );
}
