import React from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/src/shared/components/button/back-button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ScreenHeaderProps extends React.ComponentProps<typeof HStack> {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export interface ScreenHeaderLeftProps extends React.ComponentProps<
  typeof HStack
> {
  children?: React.ReactNode;
}

export interface ScreenHeaderContentProps extends React.ComponentProps<
  typeof VStack
> {
  children?: React.ReactNode;
}

export interface ScreenHeaderTitleProps extends React.ComponentProps<
  typeof Text
> {
  children?: React.ReactNode;
}

export interface ScreenHeaderSubtitleProps extends React.ComponentProps<
  typeof Text
> {
  children?: React.ReactNode;
}

export interface ScreenHeaderRightProps extends React.ComponentProps<
  typeof HStack
> {
  children?: React.ReactNode;
}

export interface ScreenHeaderBackButtonProps extends React.ComponentProps<
  typeof BackButton
> {}

const ScreenHeaderLeft = ({
  className,
  children,
  ...props
}: ScreenHeaderLeftProps) => {
  return (
    <HStack
      className={cn("items-center gap-3 flex-shrink-0", className)}
      {...props}
    >
      {children}
    </HStack>
  );
};
ScreenHeaderLeft.displayName = "ScreenHeaderLeft";

const ScreenHeaderContent = ({
  className,
  children,
  ...props
}: ScreenHeaderContentProps) => {
  return (
    <VStack
      space="xs"
      className={cn("gap-1 flex-1 min-w-0 justify-center", className)}
      {...props}
    >
      {children}
    </VStack>
  );
};
ScreenHeaderContent.displayName = "ScreenHeaderContent";

const ScreenHeaderTitle = ({
  className,
  children,
  ...props
}: ScreenHeaderTitleProps) => {
  if (!children) return null;
  return (
    <Text
      className={cn("font-bold text-foreground text-lg", className)}
      {...props}
    >
      {children}
    </Text>
  );
};
ScreenHeaderTitle.displayName = "ScreenHeaderTitle";

const ScreenHeaderSubtitle = ({
  className,
  children,
  ...props
}: ScreenHeaderSubtitleProps) => {
  if (!children) return null;
  return (
    <Text className={cn("text-foreground/60 text-xs", className)} {...props}>
      {children}
    </Text>
  );
};
ScreenHeaderSubtitle.displayName = "ScreenHeaderSubtitle";

const ScreenHeaderRight = ({
  className,
  children,
  ...props
}: ScreenHeaderRightProps) => {
  return (
    <HStack
      className={cn("items-center gap-3 flex-shrink-0", className)}
      {...props}
    >
      {children}
    </HStack>
  );
};
ScreenHeaderRight.displayName = "ScreenHeaderRight";

const ScreenHeaderBackButton = (props: ScreenHeaderBackButtonProps) => {
  return <BackButton {...props} />;
};
ScreenHeaderBackButton.displayName = "ScreenHeaderBackButton";

export const ScreenHeader = ({
  title,
  subtitle,
  showBackButton = false,
  className,
  children,
  ...props
}: ScreenHeaderProps) => {
  let leftChild: React.ReactNode = null;
  let contentChild: React.ReactNode = null;
  let rightChild: React.ReactNode = null;
  const genericChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      if (child) genericChildren.push(child);
      return;
    }

    const childType = child.type as any;
    if (
      childType === ScreenHeaderLeft ||
      childType?.displayName === "ScreenHeaderLeft"
    ) {
      leftChild = child;
    } else if (
      childType === ScreenHeaderContent ||
      childType?.displayName === "ScreenHeaderContent"
    ) {
      contentChild = child;
    } else if (
      childType === ScreenHeaderRight ||
      childType?.displayName === "ScreenHeaderRight"
    ) {
      rightChild = child;
    } else if (
      childType === ScreenHeaderBackButton ||
      childType?.displayName === "ScreenHeaderBackButton"
    ) {
      leftChild = <ScreenHeaderLeft>{child}</ScreenHeaderLeft>;
    } else {
      genericChildren.push(child);
    }
  });

  if (!leftChild && showBackButton) {
    leftChild = (
      <ScreenHeaderLeft>
        <BackButton />
      </ScreenHeaderLeft>
    );
  }

  if (!contentChild && (title !== undefined || subtitle !== undefined)) {
    contentChild = (
      <ScreenHeaderContent>
        {title !== undefined ? (
          typeof title === "string" ? (
            <ScreenHeaderTitle>{title}</ScreenHeaderTitle>
          ) : (
            title
          )
        ) : null}
        {subtitle !== undefined ? (
          typeof subtitle === "string" ? (
            <ScreenHeaderSubtitle>{subtitle}</ScreenHeaderSubtitle>
          ) : (
            subtitle
          )
        ) : null}
      </ScreenHeaderContent>
    );
  }

  return (
    <HStack
      space="md"
      accessibilityRole="header"
      className={cn("items-center justify-between w-full gap-4", className)}
      {...props}
    >
      {leftChild}
      {contentChild}
      {rightChild}
      {genericChildren}
    </HStack>
  );
};

ScreenHeader.Left = ScreenHeaderLeft;
ScreenHeader.Content = ScreenHeaderContent;
ScreenHeader.Title = ScreenHeaderTitle;
ScreenHeader.Subtitle = ScreenHeaderSubtitle;
ScreenHeader.Right = ScreenHeaderRight;
ScreenHeader.BackButton = ScreenHeaderBackButton;

export const Header = ScreenHeader;
