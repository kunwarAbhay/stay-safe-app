import { HStack } from "@/components/ui/hstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { ContactGroup } from "@/src/features/contacts/types/contact";
import { Chip, ChipText } from "@/src/shared/components/chip";

interface ContactGroupSelectProps {
  value: ContactGroup | null;
  onChange: (contactGroup: ContactGroup | null) => void;
}

interface ContactGroupChipProps {
  label: string;
  contactGroup: ContactGroup;
  isSelected: boolean;
  onSelect: (group: ContactGroup) => void;
}

const contactGroups = [
  { label: "Inner Circle", value: ContactGroup.INNER_CIRCLE },
  { label: "Nearby Helpers", value: ContactGroup.NEARBY_HELPERS },
];

const ContactGroupChip = ({
  label,
  contactGroup,
  isSelected,
  onSelect,
}: ContactGroupChipProps) => {
  const handlePress = () => {
    onSelect(contactGroup);
  };

  return (
    <Chip variant="outline" isSelected={isSelected} onPress={handlePress}>
      <ChipText>{label}</ChipText>
    </Chip>
  );
};

export const ContactGroupSelect = ({
  value,
  onChange,
}: ContactGroupSelectProps) => {
  const handleSelectContactGroup = (contactGroup: ContactGroup) => {
    if (value === contactGroup) {
      onChange(null);
    } else {
      onChange(contactGroup);
    }
  };

  return (
    <FormControl isRequired className="w-full">
      <FormControlLabel className="mb-1.5">
        <FormControlLabelText className="text-foreground font-medium text-base">
          Contact Group
        </FormControlLabelText>
      </FormControlLabel>
      <HStack space="sm" className="flex-wrap gap-2">
        {contactGroups.map((contactGroup) => (
          <ContactGroupChip
            key={contactGroup.value}
            label={contactGroup.label}
            contactGroup={contactGroup.value}
            isSelected={value === contactGroup.value}
            onSelect={handleSelectContactGroup}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
