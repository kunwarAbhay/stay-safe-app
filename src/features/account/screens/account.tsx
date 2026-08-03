import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { VStack } from "@/components/ui/vstack";
import { useAccount } from "@/src/features/account/hooks/use-account";
import { AccountProfileCard } from "@/src/features/account/components/account-profile-card";
import { PersonalDetailsCard } from "@/src/features/account/components/personal-details-card";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { useRouter } from "expo-router";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";

export default function Account() {
  const router = useRouter();
  const {
    fullname,
    phoneNumber,
    age,
    gender,
    imageUrl,
    isSigningOut,
    handleEditProfile,
    handleSignOut,
  } = useAccount();

  return (
    <ScreenLayout scrollable={true} useSafeArea={true}>
      <VStack space="xl" className="pb-8">
        <ScreenHeader
          showBackButton={router.canGoBack()}
          title="Profile"
          subtitle="Manage your personal information and emergency contact settings."
        />

        <AccountProfileCard
          fullname={fullname}
          phoneNumber={phoneNumber}
          imageUrl={imageUrl}
          onEditProfile={handleEditProfile}
        />

        <PersonalDetailsCard fullname={fullname} age={age} gender={gender} />

        <SubmitButton
          label="Log Out"
          isLoading={isSigningOut}
          onPress={handleSignOut}
          variant="outline"
        />
      </VStack>
    </ScreenLayout>
  );
}
