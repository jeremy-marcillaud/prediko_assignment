import { Args } from "../pages/admin/users/new";
import fetcher from "./fetcher";

export function createUser(url: string, { arg }: Args) {
  return fetcher(url, { method: "POST", body: JSON.stringify(arg) });
}

export function updateUser(url: string, { arg }: Args) {
  return fetcher(url, { method: "PUT", body: JSON.stringify(arg) });
}

export function deleteUser(url: string) {
  return fetcher(url, { method: "DELETE" });
}
