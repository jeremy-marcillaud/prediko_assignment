import useSWR from "swr";
import { useResponse } from "../hooks/use-response-wrapper";
import fetcher from "./fetcher";
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

export function useTest() {
  const create = useResponse(createUser, {});

  return create;
}

// const create = useResponse(createVenue, {
//   200: function successCallback(venue) {
//     const { id, name } = venue;
//     return {
//       message: t("feedback.venue.created", { name }),
//       redirect: {
//         path: ["admin", "venues", id, "hours"],
//         query: { new: "on" },
//       },
//     };
//   },
// });
