import { useForm, SubmitHandler } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";

import useSWRMutation from "swr/mutation";
import { createUser } from "../../../lib/users";
import Spinner from "../../../components/atoms/spinner";
import Button from "../../../components/atoms/button";
import CircleButton from "../../../components/atoms/circleButton";
import { ReactElement } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IFormInput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface Args {
  arg: IFormInput;
}

export default function Page(): ReactElement {
  const { trigger, isMutating } = useSWRMutation<IFormInput>("/", createUser);
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const success = () => toast.success("Success");
  const error = () => toast.error("Something went wrong");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await trigger({ ...data });
      success();
      router.push("/admin/users");
    } catch (e) {
      error();
    }
  };

  if (isMutating) {
    return <Spinner />;
  }

  return (
    <form className="h-screen p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <CircleButton path="/admin/users">
            <MdArrowBack className="text-white text-2xl" />
          </CircleButton>
          <p className="text-2xl font-bold drop-shadow-md shadow-black">
            Add new user
          </p>
        </div>
        <Button type="submit">Save and add</Button>
      </div>
      <div className="mt-10 rounded-lg grid grid-cols-3 bg-white h-4/5 p-20">
        <div className="flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input
            {...register("first_name", { required: true, maxLength: 20 })}
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
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
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <select
            {...register("role")}
            className="w-72 h-12 mr-10 mt-2 pl-2 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          >
            <option value="ADMIN">Admin</option>
            <option value="DEV">Developper</option>
          </select>
        </div>
      </div>
    </form>
  );
}
