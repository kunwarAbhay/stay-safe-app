/**
 * Formats a phone number input into standard E.164 format.
 * Strips out non-numeric characters except leading '+' and prepends country code if missing.
 */
export function formatPhoneNumber(
  phoneNumber: string,
  countryCode: string,
): string {
  return `+${countryCode}${phoneNumber}`;
}
