import { TouchableOpacity } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
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
          <TouchableOpacity
            key={gender.id}
            disabled={isDisabled}
            onPress={() => onChange(gender.id)}
            style={{ flex: 1 }}
          >
            <Box
              className={cn(
                "items-center py-4 rounded-xl border bg-white",
                isSelected
                  ? "border-primary-500 bg-primary-50"
                  : "border-outline-200",
              )}
            >
              <Icon
                as={gender.icon}
                className={cn(
                  "mb-2",
                  isSelected ? "text-primary-500" : "text-typography-600",
                )}
                size="xl"
              />
              <Text
                className={
                  isSelected
                    ? "text-primary-600 font-medium"
                    : "text-typography-600"
                }
              >
                {gender.label}
              </Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};
