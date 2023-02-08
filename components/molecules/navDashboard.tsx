import { ReactElement, ReactNode, useState } from "react";
import { MdArrowBack, MdMenu } from "react-icons/md";
import { deleteUser } from "../../lib/users";
import Button from "../atoms/button";
import CircleButton from "../atoms/circleButton";
import MyDialog from "../modal";
import SideBar from "../sideBar";
import Drawer from "./drawer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type Props = {
  setOpen: (v: boolean) => void;
  open: boolean;
  children: ReactNode;
  variant: string;
  disabled?: boolean;
  id?: string;
};

export default function NavDashboard(props: Props): ReactElement {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { setOpen, open, children, variant } = props;

  const successDeleted = () => toast.success("User successfully deleted");
  const errorMutate = () => toast.error("Something went wrong");

  const onClick = async () => {
    try {
      await deleteUser(`/${id}` as string);
      successDeleted();
      router.push("/admin/users");
    } catch (e) {
      errorMutate();
    }
  };

  return (
    <>
      <MyDialog isOpen={isOpen} setIsOpen={setIsOpen} onClick={onClick} />
      <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <CircleButton path="/admin/users">
            <MdArrowBack className="text-white text-2xl" />
          </CircleButton>
          <p className="text-2xl font-bold drop-shadow-md shadow-black">
            {children}
          </p>
        </div>
        <div className="hidden md:flex">
          {variant === "save" ? (
            <Button type="submit">Save</Button>
          ) : variant === "update" ? (
            <>
              <Button type="submit">Update</Button>
              <Button
                type={"button"}
                variant="danger"
                onClick={() => setIsOpen(true)}
              >
                Delete
              </Button>
            </>
          ) : null}
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
    </>
  );
}
