import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, G } from "react-native-svg";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface MarkAsSafeIllustrationProps {
  /** Size in pixels for width and height of illustration */
  size?: number;
  /** Optional NativeWind class names */
  className?: string;
}

export function MarkAsSafeIllustration({
  size = 240,
  className,
}: MarkAsSafeIllustrationProps) {
  const center = size / 2;
  const radius = size * 0.42;

  return (
    <View
      className={cn("items-center justify-center relative", className)}
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Decorative Sparkles & Dots */}
        <Path
          d="M 60 55 L 63 60 L 68 63 L 63 66 L 60 71 L 57 66 L 52 63 L 57 60 Z"
          fill="#34D399"
        />
        <Circle cx="48" cy="65" r="2.5" fill="#34D399" />

        <Path
          d="M 195 70 L 197 74 L 201 76 L 197 78 L 195 82 L 193 78 L 189 76 L 193 74 Z"
          fill="#34D399"
        />
        <Circle cx="185" cy="65" r="2.5" fill="#34D399" />

        <Circle cx="40" cy="115" r="3" fill="#34D399" />
        <Path
          d="M 180 115 L 182 118 L 185 120 L 182 122 L 180 125 L 178 122 L 175 120 L 178 118 Z"
          fill="#34D399"
        />

        {/* Outer Circular Soft Green Container */}
        <Circle cx={center} cy={center} r={radius} fill="#E6F4EA" />

        {/* Shield Icon & Checkmark */}
        <G transform={`translate(${center - 44}, ${center - 48}) scale(1.1)`}>
          {/* Main Green Shield */}
          <Path
            d="M 40 5 L 72 18 C 72 50 60 68 40 78 C 20 68 8 50 8 18 Z"
            fill="#10B981"
          />
          {/* Inner Shield Outline */}
          <Path
            d="M 40 12 L 66 22 C 66 48 56 62 40 70 C 24 62 14 48 14 22 Z"
            fill="none"
            stroke="#ECFDF5"
            strokeWidth="3.5"
          />
          {/* Bold White Checkmark */}
          <Path
            d="M 27 39 L 36 48 L 54 28"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </View>
  );
}
