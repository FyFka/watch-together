import { IResponse } from "../types/Response";

export const createRoom = async (): Promise<IResponse<{ id: string }>> => {
  const mokRoom = (await new Promise((res) => {
    setTimeout(() => {
      res({ payload: { id: "123" } });
    }, 1000);
  })) as IResponse<{ id: string }>;
  return mokRoom;
};
