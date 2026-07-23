import { Contact } from "./contact";

export type ContactFilterCategory =
  | "permission"
  | "contactGroup"
  | "relationship"
  | (string & {});

export interface ContactFilterOption {
  id: string;
  category: ContactFilterCategory;
  label: string;
  matches: (contact: Contact) => boolean;
}

export type ContactFiltersByCategory = Record<string, ContactFilterOption[]>;
