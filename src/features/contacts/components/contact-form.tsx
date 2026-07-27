import { forwardRef, useImperativeHandle, useState } from "react";
import { VStack } from "@/components/ui/vstack";
import {
  ContactGroup,
  Relationship,
} from "@/src/features/contacts/types/contact";
import { ContactNameInput } from "./form/contact-name-input";
import { ContactNumberInput } from "./form/contact-number-input";
import { ContactGroupSelect } from "./form/contact-group-select";
import { ContactRelationshipSelect } from "./form/contact-relationship-select";
import { ContactPermissionToggles } from "./form/contact-permission-toggles";

export interface ContactFormData {
  name: string;
  mobileCountryCode: string;
  mobileNumberValue: string;
  contactGroup: ContactGroup | null;
  relationship: Relationship | null;
  stayWithMePermission: boolean;
  sosPermission: boolean;
}

export interface ContactFormHandle {
  submit: () => void;
}

const DEFAULT_CONTACT_FORM_DATA: ContactFormData = {
  name: "",
  mobileCountryCode: "+91",
  mobileNumberValue: "",
  contactGroup: null,
  relationship: null,
  stayWithMePermission: false,
  sosPermission: false,
};

export interface ContactFormProps {
  contact?: Partial<ContactFormData>;
  onSave?: (data: ContactFormData) => void;
}

export const ContactForm = forwardRef<ContactFormHandle, ContactFormProps>(
  ({ contact, onSave }, ref) => {
    const [name, setName] = useState(
      contact?.name || DEFAULT_CONTACT_FORM_DATA.name,
    );
    const [countryCode, setCountryCode] = useState(
      contact?.mobileCountryCode || DEFAULT_CONTACT_FORM_DATA.mobileCountryCode,
    );
    const [phoneNumber, setPhoneNumber] = useState(
      contact?.mobileNumberValue || DEFAULT_CONTACT_FORM_DATA.mobileNumberValue,
    );
    const [contactGroup, setContactGroup] = useState<ContactGroup | null>(
      contact?.contactGroup || DEFAULT_CONTACT_FORM_DATA.contactGroup,
    );
    const [relationship, setRelationship] = useState<Relationship | null>(
      contact?.relationship || DEFAULT_CONTACT_FORM_DATA.relationship,
    );
    const [stayWithMe, setStayWithMe] = useState(
      contact?.stayWithMePermission ??
        DEFAULT_CONTACT_FORM_DATA.stayWithMePermission,
    );
    const [sos, setSos] = useState(
      contact?.sosPermission ?? DEFAULT_CONTACT_FORM_DATA.sosPermission,
    );

    const handleSubmit = () => {
      onSave?.({
        name,
        mobileCountryCode: countryCode,
        mobileNumberValue: phoneNumber,
        contactGroup,
        relationship,
        stayWithMePermission: stayWithMe,
        sosPermission: sos,
      });
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <VStack space="xl" className="w-full">
        <ContactNameInput value={name} onChangeText={setName} />

        <ContactNumberInput
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
        />

        <ContactGroupSelect value={contactGroup} onChange={setContactGroup} />

        <ContactRelationshipSelect
          value={relationship}
          onChange={setRelationship}
        />

        <ContactPermissionToggles
          stayWithMe={stayWithMe}
          onStayWithMeChange={setStayWithMe}
          sos={sos}
          onSosChange={setSos}
        />
      </VStack>
    );
  },
);

ContactForm.displayName = "ContactForm";
