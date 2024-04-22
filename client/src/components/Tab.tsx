import React, { useEffect ,FC } from "react";
interface TabProps {
  Body: React.ReactNode
  Title: React.ReactNode
}
interface ContentProps {
  children: React.ReactNode
  id: string
}
interface ButtonProps {
  Text: string
  buttonFor: string
}
const Tab: FC<TabProps> & { TabContent: FC<ContentProps> } & { TabButton: FC<ButtonProps> } = ({ Body, Title }) => {
  useEffect(() => {
    openTab("ContentBuilding")
  }, [])
  return (
    <div className="border  border-stone-900 border-solid" style={{ backgroundColor: "#ffffff09" }}>
      {Title}
      {Body}
    </div>
  );
}
const TabButton: FC<ButtonProps> = ({ Text, buttonFor }) => {
  return (
    <button className="tablinks" onClick={() => openTab(buttonFor)}>
      {Text}
    </button>
  )
}
const TabContent: FC<ContentProps> = ({ children, id }) => {
  return (
    <div className="tabcontent flex items-center justify-center w-full" id={id}>
      {children}
    </div>
  )
}
Tab.TabButton = TabButton
Tab.TabContent = TabContent
export const getByID = (id: string): HTMLElement | null => {
  return id !== undefined ? document.getElementById(id) : null;
};
export function openTab(id: string) {
  if (!id) return;
  const tabcontent = document.getElementsByClassName("tabcontent");
  Array.from(tabcontent).forEach((element: any) => {
    element.style.display = "none";
  });
  const element = getByID(id);
  if (element !== null) {
    element.style.display = "flex";

  }
}
export default Tab;