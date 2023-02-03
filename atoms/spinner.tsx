import { ReactElement } from "react";

export default function Spinner(): ReactElement {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
    </div>
  );
}
