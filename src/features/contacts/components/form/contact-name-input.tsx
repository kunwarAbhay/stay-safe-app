import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

interface ContactNameInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const ContactNameInput = ({
  value,
  onChangeText,
}: ContactNameInputProps) => {
  return (
    <FormControl isRequired className="w-full">
      <FormControlLabel>
        <FormControlLabelText>Full Name</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          placeholder="Enter your full name"
          value={value}
          onChangeText={onChangeText}
          className="text-base"
        />
      </Input>
    </FormControl>
  );
};
