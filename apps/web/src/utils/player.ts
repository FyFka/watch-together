import { PlyrEvent } from "plyr";

export const getPlayerTime = (input: PlyrEvent, duration: number) => {
  const { max, value } = input.target as HTMLInputElement;
  return (+value / +max) * duration;
};
