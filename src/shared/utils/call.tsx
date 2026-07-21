import { Linking } from "react-native";

export const openCallDialer = (contactNumber: string) => {
  Linking.openURL(`tel:${contactNumber}`).catch((err) =>
    console.log("Failed to open dialer on this device/web:", err),
  );
};
