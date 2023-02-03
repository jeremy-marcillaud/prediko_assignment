import { toast } from "react-toastify";

export function useResponse(request: any, handlers: any) {
  //   const success = () => toast.success("Success");
  return async function responseWrapper(...args: any) {
    const response = await request(...args);
    return response;
  };
}
