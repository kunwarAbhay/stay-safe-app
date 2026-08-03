import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { BackButton } from "@/src/shared/components/button/back-button";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { useMarkAsSafe } from "@/src/features/home/hooks/use-mark-as-safe";
import { MarkAsSafeIllustration } from "@/src/features/home/components/mark-as-safe-illustration";

export default function MarkAsSafe() {
  const { confirmMarkAsSafe, cancelMarkAsSafe, isSubmitting } = useMarkAsSafe();

  return (
    <ScreenLayout
      scrollable={false}
      className="bg-emerald-50/40"
    >
      <VStack className="flex-1" space="2xl">
        {/* Top Header */}
        <HStack className="items-center">
          <BackButton onPress={cancelMarkAsSafe} />
        </HStack>

        {/* Center Illustration & Content */}
        <VStack className="flex-1 items-center justify-center -mt-6">
          <MarkAsSafeIllustration size={240} />

          <Heading
            size="2xl"
            className="text-typography-900 text-center font-bold mt-6"
          >
            Mark as safe.
          </Heading>

          <Text size="md" className="text-typography-600 text-center mt-2">
            Are you sure you want to end this alert and mark as safe?
          </Text>
        </VStack>

        {/* Action Buttons */}
        <VStack className="mt-auto" space="md">
          <SubmitButton
            variant="outline"
            label="Cancel"
            isDisabled={isSubmitting}
            onPress={cancelMarkAsSafe}
          />

          <SubmitButton
            variant="success"
            label="Confirm"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            onPress={confirmMarkAsSafe}
          />
        </VStack>
      </VStack>
    </ScreenLayout>
  );
}
