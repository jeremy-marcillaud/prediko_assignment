import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

export function useResponse(request: any) {
  return async function responseWrapper(args: any) {
    const { trigger, isMutating } = await request(...args);
    // await trigger({ ...args.data });
    await trigger({ arg: args.data });

    // return {
    //   trigger,
    //   isMutating,
    // };
  };
}
