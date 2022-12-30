import { IExternalEvent } from "../../shared/ExternalEvent";

export const toErrorView = (message: string): IExternalEvent<undefined> => {
  return { message };
};
