import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { CallButton } from "@/src/shared/components/button/call-button";

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

export const HelplineWidget = ({
  className,
  ...props
}: React.ComponentProps<typeof VStack>) => {
  return (
    <VStack space="lg" className={cn("w-full", className)} {...props}>
      {helplines.map((helpline) => (
        <HelplineCard
          key={helpline.number}
          number={helpline.number}
          name={helpline.name}
          description={helpline.description}
        />
      ))}
    </VStack>
  );
};

interface HelplineCardProps {
  readonly number: string;
  readonly name: string;
  readonly description: string;
}

export const HelplineCard = ({
  number,
  name,
  description,
  className,
  ...props
}: HelplineCardProps & React.ComponentProps<typeof Box>) => {

  return (
    <Box
      className={cn(
        "bg-card rounded-2xl p-6 border border-border shadow-sm flex-row items-center justify-between",
        className,
      )}
      {...props}
    >
      <VStack space="sm" className="flex-1 gap-1.5">
        <Text
          size="4xl"
          className="text-primary font-bold leading-none mb-1 text-1.5xl"
        >
          {number}
        </Text>
        <VStack space="xs" className="flex-1 gap-0.5">
          <Heading size="sm" className="text-foreground font-bold text-sm">
            {name}
          </Heading>
          <Text
            size="xs"
            className="text-muted-foreground leading-normal mt-0.5 text-xs"
          >
            {description}
          </Text>
        </VStack>
      </VStack>

      <CallButton contactName={name} contactNumber={number}/>
    </Box>
  );
};
