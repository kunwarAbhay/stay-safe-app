import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon } from "@/components/ui/icon";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";

interface ContactNumberInputProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

const countryCodes = [
  { label: "US +1", value: "+1" },
  { label: "IN +91", value: "+91" },
  { label: "GB +44", value: "+44" },
  { label: "CA +1", value: "+1-CA" },
  { label: "AU +61", value: "+61" },
];

export const ContactNumberInput = ({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
}: ContactNumberInputProps) => {
  return (
    <FormControl isRequired className="w-full">
      <FormControlLabel className="mb-1.5">
        <FormControlLabelText className="text-foreground font-medium text-base">
          Contact Number
        </FormControlLabelText>
      </FormControlLabel>
      <HStack space="md" className="items-center">
        <Select selectedValue={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger
            variant="outline"
            size="md"
            className="rounded-full border-border px-3.5 h-[50px] bg-transparent flex-row items-center justify-between gap-1"
          >
            <SelectInput
              placeholder="US +1"
              className="text-foreground text-base p-0 font-medium"
            />
            <SelectIcon
              className="text-foreground h-4 w-4"
              as={ChevronDownIcon}
            />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {countryCodes.map((item) => (
                <SelectItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input className="flex-1 rounded-full bg-transparent px-4 py-3 h-[50px] border-border">
          <InputField
            placeholder="Enter number"
            value={phoneNumber}
            onChangeText={onPhoneNumberChange}
            keyboardType="phone-pad"
            className="text-base"
          />
        </Input>
      </HStack>
    </FormControl>
  );
};
