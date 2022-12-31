import { IExternalEvent } from "types/src/ExternalEvent";

export const toErrorView = (message: string): IExternalEvent<undefined> => {
  return { message };
};
