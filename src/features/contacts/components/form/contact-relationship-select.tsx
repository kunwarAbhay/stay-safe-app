import { HStack } from "@/components/ui/hstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Relationship } from "@/src/features/contacts/types/contact";
import { Chip, ChipText } from "@/src/shared/components/chip";

interface ContactRelationshipSelectProps {
  value: Relationship | null;
  onChange: (relationship: Relationship | null) => void;
}

interface ContactRelationshipChipProps {
  label: string;
  relationship: Relationship;
  isSelected: boolean;
  onSelect: (relationship: Relationship) => void;
}

const relationships = [
  { label: "Family", value: Relationship.FAMILY },
  { label: "Colleague", value: Relationship.COLLEAGUE },
  { label: "Partner", value: Relationship.PARTNER },
  { label: "Friend", value: Relationship.FRIEND },
  { label: "Close Friend", value: Relationship.CLOSE_FRIEND },
  { label: "Classmate", value: Relationship.CLASSMATE },
  { label: "Neighbor", value: Relationship.NEIGHBOR },
  { label: "Other", value: Relationship.OTHER },
];

const ContactRelationshipChip = ({
  label,
  relationship,
  isSelected,
  onSelect,
}: ContactRelationshipChipProps) => {
  const handlePress = () => {
    onSelect(relationship);
  };

  return (
    <Chip variant="outline" isSelected={isSelected} onPress={handlePress}>
      <ChipText>{label}</ChipText>
    </Chip>
  );
};

export const ContactRelationshipSelect = ({
  value,
  onChange,
}: ContactRelationshipSelectProps) => {
  const handleSelectRelationship = (relationship: Relationship) => {
    if (value === relationship) {
      onChange(null);
    } else {
      onChange(relationship);
    }
  };

  return (
    <FormControl isRequired className="w-full">
      <FormControlLabel className="mb-1.5">
        <FormControlLabelText className="text-foreground font-medium text-base">
          Relationship
        </FormControlLabelText>
      </FormControlLabel>
      <HStack className="flex-wrap gap-2">
        {relationships.map((rel) => (
          <ContactRelationshipChip
            key={rel.value}
            label={rel.label}
            relationship={rel.value}
            isSelected={value === rel.value}
            onSelect={handleSelectRelationship}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
