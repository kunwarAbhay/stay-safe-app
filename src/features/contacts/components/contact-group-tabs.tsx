import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsTriggerText,
} from "@/components/ui/tabs";
import { ContactGroup } from "@/src/features/contacts/types/contact";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ContactGroupTabsProps {
  activeContactGroup?: ContactGroup;
  onContactGroupChange?: (contactGroup: ContactGroup) => void;
}

const CONTACT_GROUP_TABS = [
  { id: ContactGroup.INNER_CIRCLE, label: "Inner circle" },
  { id: ContactGroup.NEARBY_HELPERS, label: "Near by helpers" },
] as const;

export const ContactGroupTabs = React.memo(({
  activeContactGroup = ContactGroup.INNER_CIRCLE,
  onContactGroupChange,
  className,
  ...props
}: ContactGroupTabsProps & React.ComponentProps<typeof Tabs>) => {
  const handleContactGroupChange = (contactGroup: ContactGroup) => {
     onContactGroupChange?.(contactGroup);
  }
  
  return (
    <Tabs
      value={activeContactGroup}
      onValueChange={handleContactGroupChange}
      className={cn("w-full mb-3", className)}
      {...props}
    >
      <TabsList className="w-full p-1 bg-background border border-border/80 shadow-xs flex-row items-center">
        {CONTACT_GROUP_TABS.map((tab) => {
          const isActive = activeContactGroup === tab.id;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${tab.label} group tab`}
              className={cn(
                "w-1/2 flex-1 py-2.5 px-4 items-center justify-center transition-all",
                isActive ? "bg-primary/15" : "bg-transparent active:opacity-70"
              )}
            >
              <TabsTriggerText
                className={cn(
                  "text-base font-semibold",
                  isActive ? "text-primary" : "text-muted-foreground font-medium"
                )}
              >
                {tab.label}
              </TabsTriggerText>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
});

ContactGroupTabs.displayName = "ContactGroupTabs";
