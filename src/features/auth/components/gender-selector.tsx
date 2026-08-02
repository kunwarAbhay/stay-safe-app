import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { GENDER_OPTIONS } from "@/src/config/constants";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface GenderSelectorProps {
  value: string;
  onChange: (gender: string) => void;
  isDisabled?: boolean;
}

export const GenderSelector = ({
  value,
  onChange,
  isDisabled = false,
}: GenderSelectorProps) => {
  return (
    <HStack space="md" className="justify-between">
      {GENDER_OPTIONS.map((gender) => {
        const isSelected = value === gender.id;
        return (
          <Pressable
            key={gender.id}
            disabled={isDisabled}
            onPress={() => onChange(gender.id)}
            className={cn(
              "flex-1 items-center py-4 rounded-xl border bg-white",
              isSelected
                ? "border-primary bg-primary/90"
                : "border-outline-200 bg-white",
            )}
          >
            <Icon
              as={gender.icon}
              className={cn(
                "mb-2",
                isSelected ? "text-primary-foreground" : "text-typography-600",
              )}
              size="xl"
            />
            <Text
              className={cn(
                isSelected
                  ? "text-primary-foreground font-medium"
                  : "text-typography-600",
              )}
            >
              {gender.label}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
};
