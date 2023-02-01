import Link from "next/link";
import { IconType } from "react-icons";
var classNames = require("classnames");

type Data = {
  icon: IconType;
  path: string;
  active: boolean;
};

type Props = {
  data: Data[];
};

export default function MenuItems(props: Props) {
  return (
    <div>
      <ul>
        {props.data.map((element, i) => {
          const { icon: Icon, path, active } = element;
          return (
            <li key={i}>
              <Link
                className={classNames(
                  "flex flex-row items-center  m-10 bg-gray-200 rounded-2xl h-16 w-16",
                  active ? "bg-blue-600 text-white" : "bg-gray-200"
                )}
                href={path}
              >
                <Icon size={35} className="m-5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
