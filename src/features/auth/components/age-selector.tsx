import { ChevronDown } from "lucide-react-native";
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
import { AGE_OPTIONS } from "@/src/config/constants";

export interface AgeSelectProps extends React.ComponentProps<typeof Select> {
  value: string;
  onChange: (age: string) => void;
}

export const AgeSelector = ({ value, onChange, ...props }: AgeSelectProps) => {
  return (
    <Select onValueChange={onChange} selectedValue={value} {...props}>
      <SelectTrigger
        variant="outline"
        size="lg"
        className="bg-white justify-between"
      >
        <SelectInput placeholder={"Select Age"} />
        <SelectIcon className="mr-3" as={ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {AGE_OPTIONS.map((a) => (
            <SelectItem key={a} label={a} value={a} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
