import { useRef } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
  ContactFormHandle,
} from "@/src/features/contacts/components/contact-form";
import { useRouter } from "expo-router";
import { AddContactHeader } from "@/src/features/contacts/components/add-contact-header";
import { VStack } from "@/components/ui/vstack";
import { SaveContactButton } from "@/src/features/contacts/components/save-contact-button";
import { useCreateContact } from "@/src/features/contacts/hooks/use-contacts";
import { ContactPermission } from "@/src/features/contacts/types/contact";
import { Text } from "@/components/ui/text";

export default function AddContact() {
  const router = useRouter();
  const formRef = useRef<ContactFormHandle>(null);

  const { mutate: createContact, isPending, error } = useCreateContact();

  const handleCreateContact = (formData: ContactFormData) => {
    // Need to cast/map formData to ContactCreateRequest if they differ
    const cleanCountryCode = formData.mobileCountryCode.replace(/\D/g, "");
    const cleanPhoneNumber = formData.mobileNumberValue.replace(/\D/g, "");

    if (
      !formData.name ||
      !cleanCountryCode ||
      !cleanPhoneNumber ||
      !formData.contactGroup ||
      !formData.relationship
    ) {
      console.warn("AddContact form validation failed:", {
        formData,
        cleanCountryCode,
        cleanPhoneNumber,
      });
      return;
    }

    createContact(
      {
        name: formData.name.trim(),
        mobileCountryCode: cleanCountryCode,
        mobileNumberValue: cleanPhoneNumber,
        contactGroup: formData.contactGroup,
        relationship: formData.relationship,
        stayWithMePermission: formData.stayWithMePermission
          ? ContactPermission.ALLOWED
          : ContactPermission.DENIED,
        sosPermission: formData.sosPermission
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
          <AddContactHeader />
          {error && (
            <Text className="text-error text-center text-sm px-4">
              {error.message || "Failed to create contact."}
            </Text>
          )}
          <ContactForm ref={formRef} onSave={handleCreateContact} />
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <SaveContactButton
          onPress={() => formRef.current?.submit()}
          // @ts-ignore - Assuming SaveContactButton might accept disabled/loading props or can just be wrapped
          disabled={isPending}
        />
      </ScreenLayout.Floating>
    </ScreenLayout>
  );
}
