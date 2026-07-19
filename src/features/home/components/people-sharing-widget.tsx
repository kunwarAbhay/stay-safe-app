import React from "react";
import { Box } from "@/components/ui/box";
import { Grid } from "@/components/ui/grid";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { PhoneIcon } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { StayWithMeBadge } from "@/src/shared/components/badge/stay-with-me-badge";
import { GridItem } from "@/components/ui/grid";
import { SosBadge } from "@/src/shared/components/badge/sos-badge";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";

const users = [
  {
    id: "1",
    name: "Emily Carter",
    phone: "+1 (555) 673-2184",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    status: "SOS",
  },
  {
    id: "2",
    name: "Jessica Brown",
    phone: "+1 (555) 284-9172",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    status: "STAY_WITH_ME",
  },
  {
    id: "3",
    name: "Emily Carter",
    phone: "+1 (555) 673-2184",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    status: "SOS",
  },
  {
    id: "4",
    name: "Jessica Brown",
    phone: "+1 (555) 284-9172",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    status: "STAY_WITH_ME",
  },
];

export const PeopleSharingWidget = ({
  className,
  ...props
}: React.ComponentProps<typeof Box>) => {
  return (
    <Box className={cn("w-full flex-1", className)} {...props}>
      <PeopleSharingHeader title="People sharing with you" />
      <PeopleSharingGrid _extra={{ className: "grid-cols-2" }}>
        {users.map((user) => (
          <GridItem key={user.id} _extra={{ className: "col-span-1" }}>
            <PeopleSharingCard>
              {/* Replace user banner color with random generate color */}
              <PeopleSharingCardBanner />
              <PeopleSharingCardContent>
                <PeopleSharingCardAvatar src={user.avatar} name={user.name} />
                <PeopleSharingCardName name={user.name} />
                <PeopleSharingCardContact phone={user.phone} />
                {user.status === "SOS" && <SosBadge />}
                {user.status === "STAY_WITH_ME" && <StayWithMeBadge />}
              </PeopleSharingCardContent>
            </PeopleSharingCard>
          </GridItem>
        ))}
      </PeopleSharingGrid>
    </Box>
  );
};

export const PeopleSharingHeader = ({
  title,
  className,
  ...props
}: {
  title: string;
} & React.ComponentProps<typeof HStack>) => {
  return (
    <HStack
      className={cn("justify-between items-center mb-5", className)}
      {...props}
    >
      <Text size="xl" className="text-foreground font-semibold">
        {title}
      </Text>
    </HStack>
  );
};

export const PeopleSharingGrid = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Grid>) => {
  return (
    <Grid className={cn("justify-between gap-4", className)} {...props}>
      {children}
    </Grid>
  );
};

export const PeopleSharingCard = ({
  className,
  ...props
}: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      className={cn(
        "bg-card rounded-2xl flex items-center overflow-hidden border border-border shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

export const PeopleSharingCardBanner = ({
  className,
  ...props
}: React.ComponentProps<typeof Box>) => {
  return <Box className={cn("w-full h-16 bg-primary", className)} {...props} />;
};

export const PeopleSharingCardContent = ({
  className,
  ...props
}: React.ComponentProps<typeof VStack>) => {
  return (
    <VStack
      className={cn("w-full px-4 pb-5 items-center -mt-8", className)}
      {...props}
    />
  );
};

export const PeopleSharingCardAvatar = ({
  src,
  name,
  className,
  ...props
}: {
  src: string;
  name: string;
} & React.ComponentProps<typeof Avatar>) => {
  return (
    <Avatar
      className={cn(
        "w-15 h-15 rounded-full border-4 border-card mb-3",
        className,
      )}
      {...props}
    >
      <AvatarFallbackText>{name}</AvatarFallbackText>
      <AvatarImage source={{ uri: src }} />
    </Avatar>
  );
};

export const PeopleSharingCardName = ({
  name,
  className,
  ...props
}: {
  name: string;
} & React.ComponentProps<typeof Text>) => {
  return (
    <Text
      size="md"
      className={cn(
        "text-card-foreground font-semibold text-center",
        className,
      )}
      {...props}
    >
      {name}
    </Text>
  );
};

export const PeopleSharingCardContact = ({
  phone,
  className,
  ...props
}: {
  phone: string;
} & React.ComponentProps<typeof HStack>) => {
  return (
    <HStack
      space="xs"
      className={cn("items-center mt-1 mb-4", className)}
      {...props}
    >
      <Icon as={PhoneIcon} size="sm" className="text-muted-foreground" />
      <Text size="sm" className="text-muted-foreground">
        {phone}
      </Text>
    </HStack>
  );
};
