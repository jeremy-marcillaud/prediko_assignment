import { useState } from "react";
import NavDashboard from "../../../components/molecules/navDashboard";

export default function Page() {
  let [open, setOpen] = useState<boolean>(false);

  return (
    <div className="p-5">
      <NavDashboard setOpen={setOpen} open={open} variant="save">
        Settings
      </NavDashboard>
    </div>
  );
}
