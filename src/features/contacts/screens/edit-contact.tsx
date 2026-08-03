import { useRef } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
  ContactFormHandle,
} from "@/src/features/contacts/components/contact-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { SaveContactButton } from "@/src/features/contacts/components/save-contact-button";
import {
  useUpdateContact,
  useContacts,
} from "@/src/features/contacts/hooks/use-contacts";
import { ContactPermission } from "@/src/features/contacts/types/contact";
import { Text } from "@/components/ui/text";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";

export default function EditContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const formRef = useRef<ContactFormHandle>(null);

  const { data: contactsData } = useContacts();
  const contact = contactsData?.content.find(
    (c) => String(c.id) === String(id),
  );
  const contactDetails: ContactFormData | undefined = contact
    ? {
        name: contact.name,
        mobileCountryCode: contact.mobileCountryCode?.startsWith("+")
          ? contact.mobileCountryCode
          : `+${contact.mobileCountryCode}`,
        mobileNumberValue: contact.mobileNumberValue,
        contactGroup: contact.contactGroup,
        relationship: contact.relationship,
        stayWithMePermission:
          contact.stayWithMePermission === ContactPermission.ALLOWED,
        sosPermission: contact.sosPermission === ContactPermission.ALLOWED,
      }
    : undefined;

  const { mutate: updateContact, isPending, error } = useUpdateContact();

  const handleUpdateContact = (contactFormData: ContactFormData) => {
    const cleanCountryCode = contactFormData.mobileCountryCode.replace(
      /\D/g,
      "",
    );
    const cleanPhoneNumber = contactFormData.mobileNumberValue.replace(
      /\D/g,
      "",
    );

    if (
      !id ||
      !contactFormData.name ||
      !cleanCountryCode ||
      !cleanPhoneNumber ||
      !contactFormData.contactGroup ||
      !contactFormData.relationship
    ) {
      return;
    }

    updateContact(
      {
        id,
        name: contactFormData.name.trim(),
        mobileCountryCode: cleanCountryCode,
        mobileNumberValue: cleanPhoneNumber,
        contactGroup: contactFormData.contactGroup,
        relationship: contactFormData.relationship,
        stayWithMePermission: contactFormData.stayWithMePermission
          ? ContactPermission.ALLOWED
          : ContactPermission.DENIED,
        sosPermission: contactFormData.sosPermission
          ? ContactPermission.ALLOWED
          : ContactPermission.DENIED,
      },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  return (
    <ScreenLayout>
      <ScreenLayout.Content className="pb-28">
        <VStack space="xl">
          <ScreenHeader
            showBackButton
            title="Edit Emergency Contact"
            subtitle="Update contact details and safety preferences."
          />

          {error && (
            <Text className="text-error text-center text-sm px-4">
              {error.message || "Failed to update contact."}
            </Text>
          )}
          <ContactForm
            ref={formRef}
            contact={contactDetails}
            onSave={handleUpdateContact}
          />
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <SaveContactButton
          onPress={() => formRef.current?.submit()}
          // @ts-ignore
          disabled={isPending}
        />
      </ScreenLayout.Floating>
    </ScreenLayout>
  );
}
