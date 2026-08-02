import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

interface PersonalDetailsCardProps {
  fullname: string;
  age: string;
  gender: string;
}

export const PersonalDetailsCard = ({
  fullname,
  age,
  gender,
}: PersonalDetailsCardProps) => {
  return (
    <VStack space="xs">
      <Text className="text-sm font-medium text-gray-500 px-1 mb-1">
        Personal details
      </Text>

      <View className="bg-white rounded-3xl px-5 py-1 shadow-sm border border-gray-100/60">
        <HStack className="justify-between items-center py-3.5 border-b border-gray-100">
          <Text className="text-sm text-gray-500 font-medium">Full name</Text>
          <Text className="text-sm text-gray-900 font-bold">{fullname}</Text>
        </HStack>

        <HStack className="justify-between items-center py-3.5 border-b border-gray-100">
          <Text className="text-sm text-gray-500 font-medium">Age</Text>
          <Text className="text-sm text-gray-900 font-bold">{age}</Text>
        </HStack>

        <HStack className="justify-between items-center py-3.5">
          <Text className="text-sm text-gray-500 font-medium">Gender</Text>
          <Text className="text-sm text-gray-900 font-bold">{gender}</Text>
        </HStack>
      </View>
    </VStack>
  );
};
