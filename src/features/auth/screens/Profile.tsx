import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { UserCircle2 } from "lucide-react-native";
import { useProfileSetup } from "@/src/features/auth/hooks/use-profile-setup";
import { AgeSelector } from "@/src/features/auth/components/age-selector";
import { GenderSelector } from "@/src/features/auth/components/gender-selector";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";

export default function Profile() {
  const {
    fullname,
    setFullname,
    age,
    setAge,
    gender,
    setGender,
    isSaving,
    errorMsg,
    isFormValid,
    handleSave,
  } = useProfileSetup();

  return (
    <ScreenLayout
      scrollable={true}
      useKeyboardAvoiding
      useSafeArea={false}
      className="px-6 py-12"
    >
      <VStack className="flex-1" space="xl">
        <Box className="items-center mb-6">
          <UserCircle2
            size={120}
            className="text-primary-500"
            strokeWidth={1}
          />
        </Box>

        <VStack space="md" className="mb-4">
          <Heading size="2xl">Tell Us About Yourself</Heading>
          <Text size="md" className="text-typography-500">
            Help us personalize your experience. You can always update this
            later.
          </Text>
        </VStack>

        <FormControl isRequired isDisabled={isSaving} className="mb-2">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Full Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="bg-white">
            <InputField
              placeholder="Enter Your Full name"
              value={fullname}
              onChangeText={setFullname}
            />
          </Input>
        </FormControl>

        <FormControl isDisabled={isSaving} className="mb-2">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Age
            </FormControlLabelText>
          </FormControlLabel>
          <AgeSelector value={age} onChange={setAge} isDisabled={isSaving} />
        </FormControl>

        <FormControl isDisabled={isSaving} className="mb-4">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Gender
            </FormControlLabelText>
          </FormControlLabel>
          <GenderSelector
            value={gender}
            onChange={setGender}
            isDisabled={isSaving}
          />
        </FormControl>

        {errorMsg ? (
          <FormControlError className="mb-2">
            <FormControlErrorText className="text-error-500 text-sm">
              {errorMsg}
            </FormControlErrorText>
          </FormControlError>
        ) : null}

        <SubmitButton
          isLoading={isSaving}
          isDisabled={!isFormValid}
          onPress={handleSave}
          className="mt-auto mb-4"
        >
          Finish Setup
        </SubmitButton>
      </VStack>
    </ScreenLayout>
  );
}
