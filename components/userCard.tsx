import { MdArrowForward } from "react-icons/md";
import CircleButton from "./atoms/circleButton";

export default function userCard() {
  return (
    <>
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
    </>
  );
}
