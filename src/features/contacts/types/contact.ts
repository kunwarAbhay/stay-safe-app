export enum Relationship {
  FAMILY = "FAMILY",
  FRIEND = "FRIEND",
  COLLEAGUE = "COLLEAGUE",
  PARTNER = "PARTNER",
  CLOSE_FRIEND = "CLOSE_FRIEND",
  CLASSMATE = "CLASSMATE",
  NEIGHBOR = "NEIGHBOR",
  OTHER = "OTHER",
}

export enum ContactGroup {
  INNER_CIRCLE = "INNER_CIRCLE",
  NEARBY_HELPERS = "NEARBY_HELPERS",
}

export enum ContactPermission {
  ALLOWED = "ALLOWED",
  DENIED = "DENIED",
}

export interface Contact {
  id: string;
  name: string;
  mobileCountryCode: string;
  mobileNumberValue: string;
  relationship: Relationship;
  contactGroup: ContactGroup;
  stayWithMePermission: ContactPermission;
  sosPermission: ContactPermission;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactCreateRequest {
  name: string;
  mobileCountryCode: string;
  mobileNumberValue: string;
  relationship: Relationship;
  contactGroup: ContactGroup;
  stayWithMePermission: ContactPermission;
  sosPermission: ContactPermission;
}

export interface ContactUpdateRequest extends ContactCreateRequest {
  id: string;
}
