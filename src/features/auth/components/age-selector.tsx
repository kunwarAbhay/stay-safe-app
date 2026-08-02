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
  SelectScrollView,
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
        variant="rounded"
        size="md"
        className="px-3 justify-between"
      >
        <SelectInput placeholder={"Select Age"} />
        <SelectIcon className="mr-1" as={ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="max-h-80">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectScrollView className="w-full">
            {AGE_OPTIONS.map((a) => (
              <SelectItem key={a} label={a} value={a} />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
