import React, { useCallback } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search, X } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ContactSearchInputProps {
  /** Search text value */
  value?: string;
  /** Callback when search text changes */
  onChangeText?: (text: string) => void;
  /** Custom placeholder for search input */
  placeholder?: string;
  /** Callback when clear button is pressed */
  onClear?: () => void;
  /** Optional style class name */
  className?: string;
}

export const ContactSearchInput = React.memo(({
  value = "",
  onChangeText,
  placeholder = "Search by name and number",
  onClear,
  className,
  ...props
}: ContactSearchInputProps & React.ComponentProps<typeof Input>) => {
  const handleClear = useCallback(() => {
    onChangeText?.("");
    onClear?.();
  }, [onChangeText, onClear]);

  const hasText = value.trim().length > 0;

  return (
    <Input className={cn("flex-1 h-12 rounded-full border border-border bg-background px-4 items-center flex-row", className)} {...props}>
      <InputSlot className="mr-2">
        <InputIcon as={Search} className="h-5 w-5 text-muted-foreground" />
      </InputSlot>

      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-base text-foreground py-0"
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Search contacts"
        accessibilityHint="Searches contacts by name or phone number"
      />

      {hasText && (
        <InputSlot onPress={handleClear} className="ml-1 p-1">
          <InputIcon as={X} className="h-4 w-4 text-muted-foreground" />
        </InputSlot>
      )}
    </Input>
  );
});

ContactSearchInput.displayName = "ContactSearchInput";
