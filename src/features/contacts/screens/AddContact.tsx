import { useRef } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import {
  ContactForm,
  ContactFormData,
  ContactFormHandle,
} from "@/src/features/contacts/components/contact-form";
import { useRouter } from "expo-router";
import { AddContactHeader } from "../components/add-contact-header";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

export default function AddContact() {
  const router = useRouter();
  const formRef = useRef<ContactFormHandle>(null);

  const handleCreateContact = (formData: ContactFormData) => {
    // API Placeholder: await createContactMutation(formData);
    console.log("Creating new contact API payload:", formData);

    router.back();
  };

  return (
    <ScreenLayout>
      <ScreenLayout.Content className="pb-28">
        <VStack space="xl">
          <AddContactHeader />
          <ContactForm ref={formRef} onSave={handleCreateContact} />
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <Box className="absolute bottom-6 left-5 right-5 z-20">
          <Button
            className="rounded-full py-4 w-full shadow-lg"
            onPress={() => formRef.current?.submit()}
          >
            <ButtonText className="text-lg font-semibold">
              Save Contact
            </ButtonText>
          </Button>
        </Box>
      </ScreenLayout.Floating>
    </ScreenLayout>
  );
}
