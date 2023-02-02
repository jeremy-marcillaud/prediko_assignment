import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetcher from "./fetcher";

export function useUsers() {
  const { data, error } = useSWR("/", fetcher);
  return {
    users: data,
    isLoading: !data && !error,
    isError: error,
  };
}
