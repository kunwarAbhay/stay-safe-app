import { useRef } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
  ContactFormHandle,
} from "@/src/features/contacts/components/contact-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EditContactHeader } from "../components/edit-contact-header";
import { VStack } from "@/components/ui/vstack";
import { SaveContactButton } from "../components/save-contact-button";

export default function EditContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const formRef = useRef<ContactFormHandle>(null);

  // API Placeholder: Fetch existing contact details by ID
  // const { data: contact, isLoading } = useContactQuery(id);
  const contactDetails: ContactFormData | undefined = undefined;

  const handleUpdateContact = (contactFormData: ContactFormData) => {
    // API Placeholder: await updateContactMutation({ id, ...formData });
    console.log(`Updating contact [id: ${id}] API payload:`, contactFormData);

    router.back();
  };

  return (
    <ScreenLayout>
      <ScreenLayout.Content className="pb-28">
        <VStack space="xl">
          <EditContactHeader />
          <ContactForm
            ref={formRef}
            contact={contactDetails}
            onSave={handleUpdateContact}
          />
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <SaveContactButton onPress={() => formRef.current?.submit()} />
      </ScreenLayout.Floating>
    </ScreenLayout>
  );
}
