import Link from "next/link";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { useUser } from "../../../lib/hooks";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading, isError } = useUser(id as string);

  if (!user && !isError) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-5 h-screen">
      <div>
        <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/admin/users"
              className="bg-yellow-600 rounded-full h-12 w-12 mr-10 flex items-center justify-center hover:bg-yellow-500"
            >
              <MdArrowBack className="text-white text-2xl" />
            </Link>
            <p className="text-2xl font-bold drop-shadow-md shadow-black">
              {user.first_name} {user.last_name}
            </p>
          </div>
          <div className="bg-red-300 rounded-xl h-12 flex items-center p-5">
            <button type="submit" className="text-white">
              Delete user
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-lg grid grid-cols-3 bg-white h-4/5 p-20"></div>
    </div>
  );
}
