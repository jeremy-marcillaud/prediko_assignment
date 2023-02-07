import Sidebar from "./sideBar";

export default function MenuLayout({ children }: any) {
  return (
    <div className="w-screen h-screen">
      <div className="w-32 absolute">
        <Sidebar />
      </div>
      <div className="ml-0 sm:ml-32 h-screen bg-slate-100 overflow-scroll">
        {children}
      </div>
    </div>
  );
}
