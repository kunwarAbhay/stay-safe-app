import React from "react";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Plus } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface AddContactButtonProps extends React.ComponentProps<
  typeof Fab
> {
  onPress?: () => void;
}

export const AddContactButton = ({
  onPress,
  className,
  ...props
}: AddContactButtonProps) => {
  return (
    <Fab
      size="lg"
      placement="bottom right"
      onPress={onPress}
      className={cn("bottom-24 right-5 p-4 bg-primary rounded-full", className)}
      {...props}
    >
      <FabIcon as={Plus} className="text-primary-foreground" />
    </Fab>
  );
};
