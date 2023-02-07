import { ReactElement } from "react";

type Drawer = {
  children: ReactElement;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export default function Drawer({ children, isOpen, setIsOpen }: Drawer) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 -translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          " transform top-0 left-0 w-40 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 " +
          (isOpen ? "translate-x-0 " : "-translate-x-full ")
        }
      >
        <div className="flex flex-col items-end">{children}</div>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
