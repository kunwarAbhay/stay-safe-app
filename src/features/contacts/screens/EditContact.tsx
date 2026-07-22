import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
} from "@/src/features/contacts/components/contact-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EditContactHeader } from "../components/edit-contact-header";

export default function EditContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

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
      <EditContactHeader />
      <ContactForm contact={contactDetails} onSave={handleUpdateContact} />
    </ScreenLayout>
  );
}
