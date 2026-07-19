import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Phone } from 'lucide-react-native';
import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';

const helplines = [
  {
    number: "181",
    name: "Woman helpline",
    description: "Support for women in distress.",
  },
  {
    number: "122",
    name: "National helpline",
    description: "National emergency response service.",
  },
  {
    number: "108",
    name: "Ambulance",
    description: "Medical emergency and ambulance assistance.",
  },
  {
    number: "100",
    name: "Police",
    description: "Immediate police assistance.",
  },
];

export const HelplineWidget = ({ className, ...props }: React.ComponentProps<typeof VStack>) => {
  const router = useRouter();
  
  const handleCallPress = (number: string) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      console.log('Failed to open dialer on this device/web:', err)
    );
  };

  return (
    <VStack space="lg" className={cn("w-full", className)} {...props}>
      {helplines.map((helpline) => (
        <HelplineCard
          key={helpline.number}
          number={helpline.number}
          name={helpline.name}
          description={helpline.description}
          onCallPress={handleCallPress}
        />
      ))}
    </VStack>
  );
};


interface HelplineCardProps {
  readonly number: string;
  readonly name: string;
  readonly description: string;
  readonly onCallPress?: (number: string) => void;
}

export const HelplineCard = ({
  number,
  name,
  description,
  onCallPress,
  className,
  ...props
}: HelplineCardProps & React.ComponentProps<typeof Box>) => {
  const handlePress = () => {
    if (onCallPress) {
      onCallPress(number);
    }
  };

  return (
    <Box
      className={cn(
        "bg-card rounded-2xl p-6 border border-border shadow-sm flex-row items-center justify-between",
        className
      )}
      {...props}
    >
      <VStack space="sm" className="flex-1 gap-1.5">
        <Text size="4xl" className="text-primary font-bold leading-none mb-1 text-1.5xl">
          {number}
        </Text>
        <VStack space="xs" className="flex-1 gap-0.5">
          <Heading size="sm" className="text-foreground font-bold text-sm">
            {name}
          </Heading>
          <Text size="xs" className="text-muted-foreground leading-normal mt-0.5 text-xs">
            {description}
          </Text>
        </VStack>
      </VStack>

      <Pressable
        onPress={handlePress}
        className="p-3.25 bg-foreground rounded-full items-center justify-center active:scale-95 transition-transform duration-100 shadow-sm"
      >
        <Icon
          as={Phone}
          size="md"
          className="text-background h-5 w-5"
        />
      </Pressable>
    </Box>
  );
};

