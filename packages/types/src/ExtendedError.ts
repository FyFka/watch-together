export interface IExtendedError extends Error {
  data?: {
    evt: string;
    payload: string;
  };
}
