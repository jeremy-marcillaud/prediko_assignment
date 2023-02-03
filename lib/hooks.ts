import useSWR from "swr";
import fetcher from "./fetcher";
import useSWRMutation from "swr/mutation";
import { createUser } from "./users";

export function useUsers() {
  const { data, error } = useSWR("/", fetcher);
  return {
    users: data,
    isLoading: !data && !error,
    isError: error,
  };
}

export function useUser(id: string) {
  const { data, error } = useSWR(`/${id}`, fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
}
