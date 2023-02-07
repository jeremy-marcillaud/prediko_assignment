import { useForm, SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdMenu } from "react-icons/md";
import { useRouter } from "next/router";

import useSWRMutation from "swr/mutation";
import { createUser } from "../../../lib/users";
import Spinner from "../../../components/atoms/spinner";
import Button from "../../../components/atoms/button";
import CircleButton from "../../../components/atoms/circleButton";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Drawer from "../../../components/molecules/drawer";
import SideBar from "../../../components/sideBar";

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
  const router = useRouter();
  let [open, setOpen] = useState<boolean>(false);

  //swr
  const { trigger, isMutating } = useSWRMutation<IFormInput>("/", createUser);

  //form
  const { register, handleSubmit } = useForm<IFormInput>();

  //toastify
  const success = () => toast.success("User successfully created");
  const error = () => toast.error("Something went wrong");

  //handler
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
        <div className="hidden md:flex">
          <Button type="submit">Save and add</Button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mb-1 flex justify-end items-end text-gray-400 focus-within:text-gray-600 sm:hidden"
        >
          <Drawer isOpen={open} setIsOpen={setOpen}>
            <SideBar hidden={!open} />
          </Drawer>
          <MdMenu className="w-8 h-8" />
        </button>
      </div>
      <div className="mt-10 p-10 rounded-lg grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-white h-screen lg:h-4/5 sm:p-20">
        <div className="flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input
            {...register("first_name", { required: true, maxLength: 20 })}
            className="w-96 h-12 mr-10 mt-2 mb-10 lg:mb-0 lg:w-80 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last_name">Last Name</label>
          <input
            {...register("last_name", {
              pattern: /^[A-Za-z]+$/i,
              required: true,
            })}
            className="w-96 h-12 mr-10 mt-2 mb-10 lg:mb-0 lg:w-80 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-96 h-12 mr-10 mt-2 mb-10 lg:mb-0 lg:w-80 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <select
            {...register("role")}
            className="w-96 h-12 mr-10 mt-2 pl-2 mb-10 lg:mb-0 lg:w-80 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          >
            <option value="ADMIN">Admin</option>
            <option value="DEV">Developper</option>
          </select>
        </div>
        <div className="md:hidden">
          <Button size="large" type="submit">
            Save and add
          </Button>
        </div>
      </div>
    </form>
  );
}
