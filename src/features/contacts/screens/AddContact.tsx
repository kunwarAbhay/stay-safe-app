import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
} from "@/src/features/contacts/components/contact-form";
import { useRouter } from "expo-router";
import { AddContactHeader } from "../components/add-contact-header";

export default function AddContact() {
  const router = useRouter();

  const handleCreateContact = (formData: ContactFormData) => {
    // API Placeholder: await createContactMutation(formData);
    console.log("Creating new contact API payload:", formData);

    router.back();
  };

  return (
    <ScreenLayout>
      <AddContactHeader />
      <ContactForm onSave={handleCreateContact} />
    </ScreenLayout>
  );
}
