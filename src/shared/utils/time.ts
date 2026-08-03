export const formatSOSElapsedTime = (totalElapsedSeconds: number): string => {
  const minutes = Math.floor(totalElapsedSeconds / 60);
  const seconds = totalElapsedSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
