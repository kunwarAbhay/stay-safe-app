import { Contact } from "@/src/features/contacts/types/contact";

export enum ContactFilterCategory {
  Permission = "Permission",
  ContactGroup = "ContactGroup",
  Relationship = "Relationship",
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface ContactFilterOption extends FilterOption {
  category: ContactFilterCategory;
  matches: (contact: Contact) => boolean;
}

export type ContactFiltersByCategory = Record<string, ContactFilterOption[]>;
