import { useEffect, useMemo, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { ChevronsRight, View } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SwipeButtonProps {  
  activated?: boolean;
  className?: string;
  onActivate?: () => void;
  onDeactivate?: () => void;
}

const HANDLE_SIZE = 48; // px
const PADDING = 6; // px
const THRESHOLD = 0.8;
const SWIPE_BUTTON_HEIGHT = HANDLE_SIZE + 2 * THRESHOLD;

export const SwipeButton = ({
  activated = false,
  onActivate,
  onDeactivate,
  className,
  ...props
}: SwipeButtonProps & React.ComponentProps<typeof Box>) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const translateX = useSharedValue(0);

  const maxTranslate = useMemo(() => {
    return Math.max(containerWidth - HANDLE_SIZE - PADDING * 2, 0);
  }, [containerWidth]);

  useEffect(() => {
    translateX.value = withSpring(activated ? maxTranslate : 0);
  }, [activated, maxTranslate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const pan = Gesture.Pan()
    .onBegin(() => {
      // nothing needed, translation is relative to current position
    })
    .onUpdate((event) => {
      const start = activated ? maxTranslate : 0;

      const next = Math.min(
        maxTranslate,
        Math.max(0, start + event.translationX),
      );

      translateX.value = next;
    })
    .onEnd(() => {
      if (maxTranslate === 0) return;

      const progress = translateX.value / maxTranslate;

      if (!activated) {
        if (progress >= THRESHOLD) {
          translateX.value = withSpring(maxTranslate);
          onActivate && runOnJS(onActivate)();
        } else {
          translateX.value = withSpring(0);
        }
      } else {
        if (progress <= 1 - THRESHOLD) {
          translateX.value = withSpring(0);
          onDeactivate && runOnJS(onDeactivate)();
        } else {
          translateX.value = withSpring(maxTranslate);
        }
      }
    });

  return (
    <Box
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      className={cn(
        "relative w-full flex-row items-center rounded-full bg-foreground",
        className,
      )}
      style={{  
        padding: PADDING,
      }}
      {...props}
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyle, { zIndex: 10 }]}>
          <Box
            className="items-center justify-center rounded-full bg-background shadow-sm"
            style={{
              height: HANDLE_SIZE,
              width: HANDLE_SIZE,
            }}
          >
            <Icon
              as={ChevronsRight}
              size="xl"
              className={cn("text-muted-foreground", activated && "rotate-180")}
            />
          </Box>
        </Animated.View>
      </GestureDetector>

      <Box
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <Text size="lg" className="font-semibold text-background">
          {activated ? "Swipe to deactivate" : "Swipe to activate"}
        </Text>
      </Box>
    </Box>
  );
};
