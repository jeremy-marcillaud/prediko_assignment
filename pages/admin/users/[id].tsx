import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { useUser } from "../../../lib/hooks";
import { IFormInput } from "./new";
import useSWRMutation from "swr/mutation";
import { deleteUser, updateUser } from "../../../lib/users";
import Spinner from "../../../atoms/spinner";
import Button from "../../../atoms/button";
import CircleButton from "../../../atoms/circleButton";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isError } = useUser(id as string);
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [disabled, setDisabled] = useState(true);

  const { trigger, isMutating, error } = useSWRMutation(`/${id}`, updateUser);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await trigger({ id, ...data });
    router.push("/admin/users");
  };

  const handleDelete = () => {
    deleteUser(`/${id}` as string);
  };

  if ((!user && !isError) || isMutating) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 h-screen">
      <div>
        <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <CircleButton path="/admin/users">
              <MdArrowBack className="text-white text-2xl" />
            </CircleButton>
            <p className="text-2xl font-bold drop-shadow-md shadow-black">
              User account
            </p>
          </div>
          <div className="flex">
            <div className="mr-2">
              <button
                type="submit"
                className={classNames(
                  `text-white h-fit rounded-lg font-medium transition-all w-32 p-3 py-2 text-sm`,
                  disabled ? "bg-emerald-300" : "bg-emerald-500"
                )}
                disabled={disabled}
              >
                Update user
              </button>
            </div>
            <div>
              <button
                onClick={handleDelete}
                className="bg-red-300 text-white h-fit  rounded-lg font-medium transition-all w-32 p-3 py-2 text-sm"
              >
                Delete user
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-lg grid grid-cols-3 bg-white h-4/5 p-20">
        <div className="flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input
            {...register("first_name", { required: true, maxLength: 20 })}
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
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
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
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
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
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
            className="w-72 h-12 mr-10 mt-2 pl-2 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
            defaultValue={user.role}
            onChange={(e) => {
              setDisabled(false);
              setValue("role", e.target.value);
            }}
          >
            <option value="ADMIN">Admin</option>
            <option value="DEV">Developper</option>
          </select>
        </div>
      </div>
    </form>
  );
}
