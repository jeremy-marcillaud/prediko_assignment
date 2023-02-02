import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
const { v4: uuidv4 } = require("uuid");
import { useRouter } from "next/router";

import useSWRMutation from "swr/mutation";
import { createUser } from "../../../lib/users";
import Spinner from "../../../atoms/spinner";
import Button from "../../../atoms/button";
import CircleButton from "../../../atoms/circleButton";

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

export default function App() {
  const { trigger, isMutating, data: user } = useSWRMutation("/", createUser);
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await trigger({ ...data });
      router.push("/admin/users");
    } catch (e) {}
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
