import Link from "next/link";
import { MdArrowForward, MdOutlineSearch, MdAddBox } from "react-icons/md";
const users = new Array(10).fill(1).map((_, i) => `Playlist ${i + 1}`);

export default function Page() {
  const user = users.map((el, i) => {
    return (
      <div
        key={i}
        className="mb-10 w-72 h-20 bg-white border rounded-lg shadow-lg shadow-zinc-300 flex justify-around items-center"
      >
        <div>
          <p>David Leclerq</p>
          <p className="text-gray-500 text-xs">Administrator</p>
        </div>
        <div>
          <button className=" bg-yellow-600 rounded-full h-5 w-5 flex items-center justify-center hover:bg-yellow-500">
            <MdArrowForward className="text-white" />
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="ml-24 mr-24 p-16">
      <div>
        <p className="">Our Users</p>
      </div>
      <div className="flex justify-between mt-10 mb-10 ">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <MdOutlineSearch className="w-5 h-5 absolute ml-3" />
          <input
            type="search"
            className="bg-white border w-72 h-12 pl-10 rounded-lg shadow-lg shadow-zinc-300 outline-none"
          />
        </div>
        <button className=" relative flex items-center text-black">
          <MdAddBox className="w-8 h-12 text-blue-600 absolute ml-3" />
          <Link
            className="bg-white border p-3 w-48 pl-10 rounded-lg shadow-lg shadow-zinc-300 outline-none"
            href="/admin/users/new"
          >
            add new user
          </Link>
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-between">{user}</div>
    </div>
  );
}
