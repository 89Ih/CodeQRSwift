import { Categories } from "@/static_/static";
import Image from "next/image";
import React, { ChangeEvent, SetStateAction, useState } from "react";
interface SmartDropdownProps {
  value: string;
  val: string;
  opened: boolean;
  id: string;
  onClick: (e: any) => void;
  Toggle: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
}
const SmartDropdown: React.FC<SmartDropdownProps> = ({
  value,
  val,
  opened,
  id,
  Toggle,
  onClick,
  onChange,
  onClickButton,
}) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-1 mb-3 ">
      <label
        htmlFor="static-smartdrpDown"
        className="text-xs text-slate-700 font-bold uppercase tracking-wide"
      >
        Categories <b className="text-red-700">*</b>
      </label>
      <details className="_drp_table"  id={id}>
        <summary onClick={Toggle} className={`flex items-center justify-between px-2 w-full `}>
          <h2>
            <span>{value}</span>
            {!value && (
              <span
                style={{ fontStyle: "italic" }}
                className="text-xs text-slate-400"
              >
                select device
              </span>
            )}
          </h2>
          <Image
            height={10}
            width={10}
            alt="Arrow-up-down"
            src={`/assets/${opened ? "arrowUp" : "arrowDown"}.svg`}
          />
        </summary>
          <ul className="flex flex-col">
            <li className="w-full flex flex-col justify-center items-center">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                style={{fontStyle:'italic'}}
                className=" w-full px-2 bg-transparent h-9 border-t border-b border-slate-800 outline-none _searchIcon
                            _ipt_smart_drp placeholder:text-xs"
                type="text"
                placeholder="search device Name :"
              />
              <div className="w-full flex flex-col items-center">
                {Categories.filter((a) =>
                  a.dName
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase())
                ).map((a) => (
                  <button
                    type="button"
                    onClick={onClick}
                    key={a.id}
                    className=" pt-1 w-full flex items-center px-2 gap-2 border-b border-slate-800 pb-1 hover:bg-sky-800"
                  >
                    <Image
                      loading="lazy"
                      height={18}
                      width={18}
                      alt={a.dName}
                      src={`/assets/${a.dName}.svg`}
                    />
                    <p >{a.dName}</p>
                  </button>
                ))}
              </div>
            </li>
          </ul>
          <div className="flex justify-center">
            <div
              style={{ width: "96%" }}
              className="w-full h-8 border border-slate-800 flex justify-between pl-2 my-2 rounded-md text-xs"
            >
              <input
                value={val}
                onChange={onChange}
                style={{ fontStyle: "italic" }}
                type="text"
                className="bg-transparent outline-none"
                placeholder="enter new device:"
              />
              <button
                className="bg-sky-700 w-12 rounded-e hover:bg-sky-500 border-transparent"
                type="button"
                onClick={onClickButton}
              >
                enter
              </button>
            </div>
          </div>
 
      </details>
    </div>
  );
};

export default SmartDropdown;
