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
      <FormControlLabel className="mb-1.5">
        <FormControlLabelText className="text-foreground font-medium text-base">
          Full Name
        </FormControlLabelText>
      </FormControlLabel>
      <Input className="rounded-full bg-transparent px-4 py-3 border-border">
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
