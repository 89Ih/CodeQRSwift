import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/static_/icons";
import InnerHTML from "./InnerHTML";

const Aside: FC<any> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <section className="flex flex-col items-end" style={{ width: "275px" }}>
      <Image
       className="fixed top-3 right-2 "
        height={40}
        width={40}
        alt="Menu"
        src={"/assets/Menu.svg"}
       
        onClick={() => setToggle(!toggle)}
      />
      {toggle === true && (
        <aside
          onClick={() => setToggle(false)}
          style={{ backgroundColor: "#090b0f" }}
          className={`fixed min-h-fullright-0 bottom-0 top-0 z-10`}
        >
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-between m-4">
              <h2>
                <span className="text-slate-600">QR</span>Swift
              </h2>
              <button onClick={() => setToggle(false)}  >
                <InnerHTML Convert={icons.cancelIcon}/>
              </button>
            </div>

            <div className="anchor-container">
              <div className="h-10 w-full py-1 px-3 flex gap-2 items-center">
                <div dangerouslySetInnerHTML={{ __html: icons.insertIcon }} />
                <Link className="w-60" href="/insertion">
                  Insert Devices
                </Link>
              </div>
              <div className="h-10 w-full py-1 px-3 flex gap-2 items-center ">
                <div dangerouslySetInnerHTML={{ __html: icons.locationIcon }} />
                <Link className="w-60" href="/location/S01">
                  Location
                </Link>
              </div>
              <div className="h-10 w-full py-1 px-3 flex gap-2 items-center">
                <div dangerouslySetInnerHTML={{ __html: icons.githubIcon }} />
                <Link
                  className="w-60"
                  href="https://github.com/89Ih?tab=repositories"
                  target="_blank"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
};

export default Aside;
