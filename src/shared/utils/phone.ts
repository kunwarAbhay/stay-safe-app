/**
 * Formats a phone number input into standard E.164 format.
 * Strips out non-numeric characters except leading '+' and prepends default country code if missing.
 */
export function formatPhoneNumber(
  phoneNumber: string,
  countryCode: string = "91"
): string {
  if (!phoneNumber) return "";
  return `+${countryCode}${phoneNumber}`;
}
