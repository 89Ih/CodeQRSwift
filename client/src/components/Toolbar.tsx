import Image from "next/image";
import React from "react";
interface ToolbarProps {
  children: React.ReactNode;
  clss: string;
}
function Toolbar({ children, clss }: ToolbarProps) {
  return <div className={clss}>{children}</div>;
}
interface IconbarProps {
  src: string;
  alt: string;
  onClick: (id: any) => void;
}
const Iconbar = ({ src, alt, onClick }: IconbarProps) => {
  return (
    <Image
      onClick={onClick}
      height={25}
      width={25}
      alt={alt}
      src={src}
      className=" hover:border-2 border-solid border-slate-900 rounded-sm"
    />
  );
};
Toolbar.Iconbar = Iconbar;
export default Toolbar;
