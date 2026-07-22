import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { ContactList } from "@/src/features/contacts/components/contact-list";
import {
  Contact,
  ContactGroup,
  ContactPermission,
  Relationship,
} from "@/src/features/contacts/types/contact";

const INITIAL_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Jessica Brown",
    mobileCountryCode: "1",
    mobileNumberValue: "5552849172",
    relationship: Relationship.FAMILY,
    contactGroup: ContactGroup.INNER_CIRCLE,
    sosPermission: ContactPermission.ALLOWED,
    stayWithMePermission: ContactPermission.DENIED,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jessica Brown",
    mobileCountryCode: "1",
    mobileNumberValue: "5552849172",
    relationship: Relationship.FAMILY,
    contactGroup: ContactGroup.INNER_CIRCLE,
    sosPermission: ContactPermission.ALLOWED,
    stayWithMePermission: ContactPermission.ALLOWED,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Contacts() {
  return (
    <ScreenLayout isTabScreen>
      <ContactList contacts={INITIAL_CONTACTS} />
    </ScreenLayout>
  );
}
