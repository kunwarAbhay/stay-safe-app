import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { useProfileSetup } from "@/src/features/auth/hooks/use-profile-setup";
import { AgeSelector } from "@/src/features/auth/components/age-selector";
import { GenderSelector } from "@/src/features/auth/components/gender-selector";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
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
    <ScreenLayout scrollable={false} useKeyboardAvoiding className="px-6">
      <VStack className="flex-1" space="xl">
        <ScreenHeader
          showBackButton={router.canGoBack()}
          title="Tell Us About Yourself"
          subtitle="Help us personalize your experience"
        />

        <FormControl isRequired isDisabled={isSaving} className="mb-2">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Full Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input>
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
