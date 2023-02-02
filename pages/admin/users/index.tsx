import Link from "next/link";
import { useState } from "react";
import { MdArrowForward, MdOutlineSearch, MdAddBox } from "react-icons/md";
import { useUsers } from "../../../lib/hooks";
// const users = new Array(10).fill(1).map((_, i) => `Playlist ${i + 1}`);

export default function Page() {
  const { users, isLoading, isError } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  if (!users && !isError) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  let filteredData = users;
  if (users && searchTerm) {
    filteredData = users.filter((user: any) => {
      return (
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  return (
    <div className="ml-24 mr-24 p-16">
      <div>
        <p className="text-2xl font-bold drop-shadow-md shadow-black">
          Our Users
        </p>
      </div>
      <div className="flex justify-between mt-10 mb-10 ">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <MdOutlineSearch className="w-5 h-5 absolute ml-3" />
          <input
            type="search"
            className="bg-white border w-72 h-12 pl-10 pr-5 rounded-lg shadow-lg shadow-zinc-300 outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link
          className=" relative flex items-center text-black"
          href="/admin/users/new"
          passHref
        >
          <MdAddBox className="w-8 h-12 text-blue-600 absolute ml-2" />
          <span className="bg-white border p-3 w-48 pl-16 rounded-lg shadow-lg shadow-zinc-300 outline-none">
            add new user
          </span>
        </Link>
      </div>
      <ul className="grid grid-cols-3 w-full">
        {filteredData?.map((item: any, i: any) => {
          return (
            <li
              key={i}
              className="mb-5 w-72 h-20 bg-white border rounded-lg shadow-lg shadow-zinc-300 flex justify-around items-center"
            >
              <div>
                <p>
                  {item.first_name} {item.last_name}
                </p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>
              <div>
                <Link
                  href="/admin/users/1"
                  className=" bg-yellow-600 rounded-full h-5 w-5 flex items-center justify-center hover:bg-yellow-500"
                >
                  <MdArrowForward className="text-white" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
