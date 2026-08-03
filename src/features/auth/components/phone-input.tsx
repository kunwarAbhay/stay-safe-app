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
  SelectScrollView,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "@/src/config/constants";

export interface PhoneInputProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  errorMsg?: string;
  placeholder?: string;
}

export const PhoneInput = ({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  errorMsg,
  placeholder = "Enter mobile number",
  className,
  ...props
}: PhoneInputProps & React.ComponentProps<typeof FormControl>) => {
  const selectedCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || DEFAULT_COUNTRY_CODE;
  const selectedLabel = `${selectedCountry.flag} ${selectedCountry.label}`;

  return (
    <FormControl
      isInvalid={Boolean(errorMsg)}
      className={cn("w-full", className)}
      {...props}
    >
      <HStack space="sm">
        <Select selectedValue={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger
            variant="rounded"
            size="md"
            className="justify-between px-3 w-28"
          >
            <SelectInput value={selectedLabel} placeholder={selectedLabel} />
            <SelectIcon className="mr-1" as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent className="max-h-80">
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectScrollView className="w-full">
                {COUNTRY_CODES.map((c) => (
                  <SelectItem
                    key={c.code}
                    label={`${c.flag} ${c.label}`}
                    value={c.code}
                  />
                ))}
              </SelectScrollView>
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
};
