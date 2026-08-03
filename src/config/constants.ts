import { User, UserRound, Users } from "lucide-react-native";

export interface CountryCodeOption {
  code: string;
  label: string;
  flag: string;
}

export const DEFAULT_COUNTRY_CODE: CountryCodeOption = {
  code: "91",
  label: "+91",
  flag: "🇮🇳",
};

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "91", label: "+91", flag: "🇮🇳" },
  { code: "1", label: "+1", flag: "🇺🇸" },
  { code: "44", label: "+44", flag: "🇬🇧" },
  { code: "61", label: "+61", flag: "🇦🇺" },
  { code: "81", label: "+81", flag: "🇯🇵" },
  { code: "49", label: "+49", flag: "🇩🇪" },
  { code: "33", label: "+33", flag: "🇫🇷" },
  { code: "971", label: "+971", flag: "🇦🇪" },
];

export const GENDER_OPTIONS = [
  { id: "male", label: "Male", icon: User },
  { id: "female", label: "Female", icon: UserRound },
  { id: "other", label: "Other", icon: Users },
];

export const AGE_OPTIONS = Array.from({ length: 60 }, (_, i) =>
  (i + 18).toString(),
);

export const FALLBACK_PROFILE_IMG_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop";

export const OTP_LENGTH = 6;  
export const RESEND_TIMER_SECONDS = 30
export const SOS_COUNTDOWN_IN_SECONDS=10;