import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "./new";
import useSWRMutation from "swr/mutation";
import { deleteUser, updateUser } from "../../../lib/users";
import Spinner from "../../../components/atoms/spinner";
import Button from "../../../components/atoms/button";
import useSWR from "swr";
import { getUser } from "../../../lib/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavDashboard from "../../../components/molecules/navDashboard";
import MyDialog from "../../../components/modal";

export default function Page(): ReactElement {
  const router = useRouter();
  const { id: userId } = router.query;

  //swr
  const { data: user, error: isError } = useSWR(
    `/${userId}` as string,
    getUser
  );
  const { trigger, isMutating } = useSWRMutation<IFormInput>(
    `/${userId}`,
    updateUser
  );

  // toastify
  const successUpdated = () => toast.success("User updated");
  const successDeleted = () => toast.success("User successfully deleted");
  const errorMutate = () => toast.error("Something went wrong");

  // form
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [disabled, setDisabled] = useState<boolean>(true);
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [open, setOpen] = useState<boolean>(false);

  // event handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await trigger({ ...data, id: userId });
      successUpdated();
      setDisabled(true);
      router.push("/admin/users");
    } catch {
      errorMutate();
    }
  };

  const onClick = async () => {
    try {
      await deleteUser(`/${userId}` as string);
      successDeleted();
      router.push("/admin/users");
    } catch (e) {
      errorMutate();
    }
  };

  if ((!user && !isError) || isMutating) {
    return <Spinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 h-screen">
        <MyDialog isOpen={isOpen} setIsOpen={setIsOpen} onClick={onClick} />
        <NavDashboard setOpen={setOpen} open={open} variant="update">
          User account
        </NavDashboard>
        <div className="h-fit md:h-4/5 w-full bg-white">
          <div className="mt-10 p-10 rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-white h-1/3 sm:p-20 md:p-10">
            <div className="flex flex-col">
              <label htmlFor="first_name">First Name</label>
              <input
                {...register("first_name", { required: true, maxLength: 20 })}
                className="w-64 h-12 mt-2 p-5 mb-10 lg:w-80 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
                onChange={(e) => {
                  setDisabled(false);
                  setValue("first_name", e.target.value);
                }}
                defaultValue={user.first_name}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name">Last Name</label>
              <input
                {...register("last_name", {
                  pattern: /^[A-Za-z]+$/i,
                  required: true,
                })}
                className="w-64 h-12 mt-2 p-5 mb-10 lg:w-80 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
                onChange={(e) => {
                  setDisabled(false);
                  setValue("last_name", e.target.value);
                }}
                defaultValue={user.last_name}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-64 h-12 mt-2 p-5 mb-10 lg:w-80 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
                onChange={(e) => {
                  setDisabled(false);
                  setValue("email", e.target.value);
                }}
                defaultValue={user.email}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role">Role</label>
              <select
                {...register("role")}
                className="w-64 h-12 mt-2 pl-2 mb-10 lg:w-80 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
                defaultValue={user.role}
                onChange={(e) => {
                  setDisabled(false);
                  setValue("role", e.target.value);
                }}
              >
                <option value="ADMIN">Admin</option>
                <option value="DEV">Developper</option>
              </select>
              <div className="w-64">
                <div className="flex justify-between md:hidden">
                  <Button type={"submit"} disabled={disabled}>
                    Update user
                  </Button>
                  <Button
                    type={"button"}
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                  >
                    Delete user
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
