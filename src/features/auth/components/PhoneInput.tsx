import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { COUNTRY_CODES } from "@/src/config/constants";

export interface PhoneInputProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  errorMsg?: string;
  placeholder?: string;
}

export function PhoneInput({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  errorMsg,
  placeholder = "Enter mobile number",
  className,
  ...props
}: PhoneInputProps & React.ComponentProps<typeof FormControl>) {
  return (
    <FormControl
      isInvalid={Boolean(errorMsg)}
      className={cn("w-full", className)}
      {...props}
    >
      <HStack space="sm">
        <Select selectedValue={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger
            variant="outline"
            size="md"
            className="justify-between px-3 min-w-23.75 border-outline-300 rounded-md"
          >
            <SelectInput placeholder="+91" />
            <SelectIcon className="mr-1" as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {COUNTRY_CODES.map((c) => (
                <SelectItem
                  key={c.code}
                  label={`${c.flag} ${c.label}`}
                  value={c.code}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Input className="flex-1">
          <InputField
            placeholder={placeholder}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={onPhoneNumberChange}
          />
        </Input>
      </HStack>

      <FormControlError className="mt-1">
        <FormControlErrorText className="text-error-500 text-sm">
          {errorMsg}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
