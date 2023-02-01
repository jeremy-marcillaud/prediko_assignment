import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="h-screen p-5">
      <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/admin/users"
            className="bg-yellow-600 rounded-full h-12 w-12 mr-10 flex items-center justify-center hover:bg-yellow-500"
          >
            <MdArrowBack className="text-white text-2xl" />
          </Link>
          <p className="text-2xl font-bold drop-shadow-md shadow-black">
            Add new user
          </p>
        </div>
        <div className="bg-emerald-300 rounded-xl h-12 flex items-center p-5">
          <button className="text-white">save and add</button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 rounded-lg grid grid-cols-3 bg-white h-4/5 p-20"
      >
        <div className="flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input
            {...register("firstName", { required: true, maxLength: 20 })}
            id="first_name"
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last_name">Last Name</label>
          <input
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            className="w-72 h-12 mr-10 mt-2 p-5 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { pattern: /^[A-Za-z]+$/i })}
            className="w-72 h-12 mr-10 mt-2 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <select
            {...register("role")}
            className="w-72 h-12 mr-10 mt-2 pl-2 rounded bg-white border shadow-lg shadow-zinc-300 outline-none"
          >
            <option value="admin">Admin</option>
            <option value="dev">Developper</option>
          </select>
        </div>
        {/* <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" /> */}
      </form>
    </div>
  );
}
