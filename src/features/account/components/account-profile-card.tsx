import { View, Pressable } from "react-native";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pencil } from "lucide-react-native";

interface AccountProfileCardProps {
  fullname: string;
  phoneNumber: string;
  imageUrl: string | null;
  onEditProfile: () => void;
}

export const AccountProfileCard = ({
  fullname,
  phoneNumber,
  imageUrl,
  onEditProfile,
}: AccountProfileCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-6 items-center shadow-sm border border-gray-100/60">
      <View className="relative mb-3">
        <Avatar className="w-24 h-24 rounded-full">
          <AvatarFallbackText>
            {fullname.at(0)?.toUpperCase() || "U"}
          </AvatarFallbackText>
          {imageUrl ? <AvatarImage source={{ uri: imageUrl }} /> : null}
        </Avatar>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit Profile"
          onPress={onEditProfile}
          className="absolute bottom-0 right-0 bg-[#8B5CF6] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm active:opacity-80"
        >
          <Pencil size={14} color="#FFFFFF" />
        </Pressable>
      </View>

      <VStack space="xs" className="items-center">
        <Text className="text-xl font-bold text-gray-900">{fullname}</Text>
        <Text className="text-sm text-gray-500 font-medium">{phoneNumber}</Text>
      </VStack>
    </View>
  );
};
