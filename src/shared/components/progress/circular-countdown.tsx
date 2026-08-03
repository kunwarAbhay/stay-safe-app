import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Text } from "@/components/ui/text";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface CircularCountdownRef {
  /** Starts or resumes the countdown timer. */
  start: () => void;
  /** Pauses the countdown timer. */
  pause: () => void;
  /** Resets the timer back to duration or a new specified duration. */
  reset: (newDuration?: number) => void;
  /** Resets and immediately starts the countdown. */
  restart: (newDuration?: number) => void;
  /** Current remaining seconds. */
  remainingSeconds: number;
  /** Whether the timer is currently actively running. */
  isRunning: boolean;
}

export interface CircularCountdownProps {
  /**
   * Total duration of the countdown in seconds.
   * @default 7
   */
  duration?: number;

  /**
   * Initial seconds remaining if starting from a value different than duration.
   */
  initialSeconds?: number;

  /**
   * Handler triggered when the timer reaches 0.
   */
  onTimerEnd?: () => void;

  /**
   * Handler triggered every second with updated remaining seconds.
   */
  onTick?: (remainingSeconds: number) => void;

  /**
   * Whether the timer should start counting down automatically on mount.
   * @default true
   */
  autoStart?: boolean;

  /**
   * Outer diameter size of the circular countdown container in pixels.
   * @default 180
   */
  size?: number;

  /**
   * Stroke thickness of the progress arc in pixels.
   * @default 14
   */
  strokeWidth?: number;

  /**
   * Color of the active countdown progress arc.
   * @default "#EE2B2B"
   */
  progressColor?: string;

  /**
   * Color of the background track ring.
   * @default "#FCA5A5"
   */
  trackColor?: string;

  /**
   * Outer container background tint color.
   * @default "#FDE8E8"
   */
  backgroundColor?: string;

  /**
   * Color of the center text countdown number.
   * @default "#18182B"
   */
  textColor?: string;

  /**
   * Whether to display the center text countdown number.
   * @default true
   */
  showText?: boolean;

  /**
   * Custom text formatting function for displaying remaining seconds.
   * @default (sec) => sec.toString().padStart(2, "0")
   */
  formatText?: (remainingSeconds: number) => string;

  /**
   * Optional boolean to externally control paused state.
   */
  isPaused?: boolean;

  /**
   * Optional NativeWind / Tailwind class names for root container.
   */
  className?: string;

  /**
   * Custom children to render inside the center circle (replaces default text if provided).
   */
  children?: React.ReactNode;

  /**
   * Test ID for automated component testing.
   */
  testID?: string;
}

export const CircularCountdown = forwardRef<
  CircularCountdownRef,
  CircularCountdownProps
>(
  (
    {
      duration = 7,
      initialSeconds,
      onTimerEnd,
      onTick,
      autoStart = true,
      size = 180,
      strokeWidth = 14,
      progressColor = "#EE2B2B",
      trackColor = "#FCA5A5",
      backgroundColor = "#FDE8E8",
      textColor = "#18182B",
      showText = true,
      formatText = (sec) => sec.toString().padStart(2, "0"),
      isPaused: externalIsPaused,
      className,
      children,
      testID = "circular-countdown",
    },
    ref,
  ) => {
    const initialSec = initialSeconds ?? duration;
    const [remainingSeconds, setRemainingSeconds] = useState(initialSec);
    const [progress, setProgress] = useState(initialSec / (duration || 1));
    const [isRunning, setIsRunning] = useState(autoStart && !externalIsPaused);

    // Dynamic prop refs to prevent stale closure issues in animation frames
    const onTimerEndRef = useRef(onTimerEnd);
    const onTickRef = useRef(onTick);
    const durationRef = useRef(duration);

    useEffect(() => {
      onTimerEndRef.current = onTimerEnd;
    }, [onTimerEnd]);

    useEffect(() => {
      onTickRef.current = onTick;
    }, [onTick]);

    useEffect(() => {
      durationRef.current = duration;
    }, [duration]);

    // Loop control refs
    const animFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const remainingMsAtPauseRef = useRef<number>(initialSec * 1000);
    const lastSecRef = useRef<number>(initialSec);
    const hasEndedRef = useRef<boolean>(false);

    // Synchronize externalIsPaused prop if provided
    useEffect(() => {
      if (externalIsPaused !== undefined) {
        setIsRunning(!externalIsPaused);
      }
    }, [externalIsPaused]);

    const stopLoop = useCallback(() => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    }, []);

    const startTimer = useCallback(() => {
      if (hasEndedRef.current) return;
      stopLoop();
      setIsRunning(true);

      const targetDurationMs = durationRef.current * 1000;
      const currentRemainingMs = remainingMsAtPauseRef.current;
      startTimeRef.current =
        Date.now() - (targetDurationMs - currentRemainingMs);

      const tick = () => {
        if (!startTimeRef.current) return;
        const now = Date.now();
        const totalDurationMs = durationRef.current * 1000;
        const elapsedMs = now - startTimeRef.current;
        const remainingMs = Math.max(0, totalDurationMs - elapsedMs);
        remainingMsAtPauseRef.current = remainingMs;

        const currentProgress =
          totalDurationMs > 0 ? remainingMs / totalDurationMs : 0;
        const currentSec = Math.ceil(remainingMs / 1000);

        setProgress(currentProgress);

        if (currentSec !== lastSecRef.current) {
          lastSecRef.current = currentSec;
          setRemainingSeconds(currentSec);
          onTickRef.current?.(currentSec);
        }

        if (remainingMs <= 0) {
          setProgress(0);
          setRemainingSeconds(0);
          setIsRunning(false);
          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            onTimerEndRef.current?.();
          }
          return;
        }

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    }, [stopLoop]);

    const pauseTimer = useCallback(() => {
      stopLoop();
      setIsRunning(false);
    }, [stopLoop]);

    const resetTimer = useCallback(
      (newDuration?: number) => {
        stopLoop();
        const activeDuration = newDuration ?? durationRef.current;
        durationRef.current = activeDuration;
        remainingMsAtPauseRef.current = activeDuration * 1000;
        lastSecRef.current = activeDuration;
        hasEndedRef.current = false;
        setRemainingSeconds(activeDuration);
        setProgress(1);
        setIsRunning(false);
      },
      [stopLoop],
    );

    const restartTimer = useCallback(
      (newDuration?: number) => {
        resetTimer(newDuration);
        // Start immediately after resetting state
        setTimeout(() => {
          startTimer();
        }, 0);
      },
      [resetTimer, startTimer],
    );

    // Expose control handlers via ref
    useImperativeHandle(ref, () => ({
      start: startTimer,
      pause: pauseTimer,
      reset: resetTimer,
      restart: restartTimer,
      remainingSeconds,
      isRunning,
    }));

    // Effect for autoStart or external play/pause
    useEffect(() => {
      if (isRunning) {
        startTimer();
      } else {
        pauseTimer();
      }
      return () => stopLoop();
    }, [isRunning, startTimer, pauseTimer, stopLoop]);

    // Geometry calculations
    const center = size / 2;
    const radius = Math.max(0, (size - strokeWidth) / 2);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <View
        testID={testID}
        accessibilityRole="timer"
        accessibilityLabel={`Countdown timer: ${remainingSeconds} seconds remaining`}
        accessibilityValue={{ min: 0, max: duration, now: remainingSeconds }}
        className={cn("items-center justify-center relative", className)}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background track circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            opacity={0.35}
          />
          {/* Active countdown progress arc */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </Svg>
        <View
          className="absolute inset-0 items-center justify-center pointer-events-none"
          style={StyleSheet.absoluteFill}
        >
          {children ? (
            children
          ) : showText ? (
            <Text
              className="font-bold text-center"
              style={{
                fontSize: Math.round(size * 0.28),
                color: textColor,
                lineHeight: Math.round(size * 0.34),
              }}
            >
              {formatText(remainingSeconds)}
            </Text>
          ) : null}
        </View>
      </View>
    );
  },
);

CircularCountdown.displayName = "CircularCountdown";
