import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface SosAlertFeatureCardProps {
  /** Lucide icon component to display inside card header */
  icon: LucideIcon;
  /** Label describing the SOS feature or data feed */
  label: string;
  /** Optional NativeWind class names */
  className?: string;
}

export const SosAlertFeatureCard = ({
  icon: Icon,
  label,
  className,
}: SosAlertFeatureCardProps) => {
  return (
    <Box
      className={cn(
        "flex-1 bg-white rounded-2xl p-4 shadow-sm items-start justify-between min-h-[100px]",
        className,
      )}
    >
      <Box className="bg-slate-100 p-2 rounded-full mb-3">
        <Icon size={20} color="#374151" strokeWidth={2} />
      </Box>
      <Text size="sm" className="font-medium text-typography-900 leading-tight">
        {label}
      </Text>
    </Box>
  );
};
