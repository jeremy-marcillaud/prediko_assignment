import Link from "next/link";
import { ReactElement, useState } from "react";
import { MdArrowForward, MdOutlineSearch, MdAddBox } from "react-icons/md";
import CircleButton from "../../../components/atoms/circleButton";
import Spinner from "../../../components/atoms/spinner";
import useSWR from "swr";
import { getUsers } from "../../../lib/users";
// const users = new Array(10).fill(1).map((_, i) => `Playlist ${i + 1}`);

export default function Page(): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");

  //swr
  const { data: users, error: isError } = useSWR("/", getUsers);

  // handler
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  //search
  let filteredData = users;
  if (users && searchTerm) {
    filteredData = users.filter((user: any) => {
      return (
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  if (!users && !isError) {
    return <Spinner />;
  }

  return (
    <div className="mr-0 p-16">
      <div>
        <p className="text-2xl font-bold drop-shadow-md shadow-black">
          Our Users
        </p>
      </div>
      <div className="block md:flex justify-between mt-10 mb-10">
        <div className="w-96 mb-5 mr-2 relative flex items-center text-gray-400 focus-within:text-gray-600">
          <MdOutlineSearch className="w-5 h-5 absolute ml-3" />
          <input
            type="search"
            className="bg-white border w-96 h-12 pl-10 pr-5 md:w-72 rounded-lg shadow-lg shadow-zinc-300 outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link
          className="w-96 relative flex items-start text-black"
          href="/admin/users/new"
          passHref
        >
          <MdAddBox className="w-8 h-12 text-blue-600 absolute ml-2" />
          <span className="bg-white border p-3 w-full md:w-72 pl-16 rounded-lg shadow-lg shadow-zinc-300 outline-none">
            add new user
          </span>
        </Link>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pr-10">
        {filteredData?.map((item: any, i: any) => {
          return (
            <li
              key={i}
              className="mb-5 w-96 h-20 lg:w-80 bg-white border rounded-lg shadow-lg shadow-zinc-300 flex justify-around items-center"
            >
              <div>
                <p>
                  {item.first_name} {item.last_name}
                </p>
                <p className="text-gray-500 text-xs">
                  {item.role === "ADMIN" ? "Administrator" : "Developper"}
                </p>
              </div>
              <CircleButton path={`/admin/users/${item.id}`}>
                <MdArrowForward className="text-white" />
              </CircleButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
