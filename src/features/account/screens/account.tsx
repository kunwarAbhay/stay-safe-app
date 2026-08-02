import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { VStack } from "@/components/ui/vstack";
import { useAccount } from "@/src/features/account/hooks/use-account";
import { AccountHeader } from "@/src/features/account/components/account-header";
import { AccountProfileCard } from "@/src/features/account/components/account-profile-card";
import { PersonalDetailsCard } from "@/src/features/account/components/personal-details-card";
import { SubmitButton } from "@/src/shared/components/button/submit-button";

export default function Account() {
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
        <AccountHeader />

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
          variant="destructive"
        />
      </VStack>
    </ScreenLayout>
  );
}
