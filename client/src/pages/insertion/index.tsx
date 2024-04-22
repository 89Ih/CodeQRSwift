import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { departmentArr, buildingArr, floorArr } from "@/static_/static";
import QRCode from "react-qr-code";
import Link from "next/link";
import Tab, { getByID } from "@/components/Tab";
import restService from "@/service/rest.service";
import Dropdown from "@/components/Dropdown";
import Aside from "@/components/Aside";
function Inserting() {
  const [building, setBuilding] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [officeNr, setOfficeNr] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const combaind = building + floor + department;
  // const handleChnage=(event:ChangeEvent<HTMLSelectElement>)=>{
  //    SetPCode([...PCode,event.currentTarget.value])
  // }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true)
    const formData = { building, floor, department, officeNr };
    return restService.declareOffice(formData).then((res) => {
    setLoader(false)
    }).catch((err)=>{
        console.error(err);
        setLoader(false)
        
    });
  }
  return (
    <section className=" min-h-screen flex flex-col">
        <div className="pl-4 h-20 flex  justify-between items-center _div_line">
        <Link  href="/">
        <p className=" text-4xl  ">
          <span className="text-slate-600">QR</span>
          <span className="text-slate-300">Swift</span>
        </p>
        </Link>
        <Aside/>
        </div>

      <h1 className="m-5">Insert new Devices and define offices</h1>
       <div className="m-5"> 
      <Tab
        Title={
          <div className="border-b border-solid border-stone-900 p-3 flex gap-2">
            <Tab.TabButton Text={"Building"} buttonFor="ContentBuilding" />
            <Tab.TabButton Text={"Devices"} buttonFor="ContentDevices" />
          </div>
        }
        Body={
          <div className="p-3 flex flex-col items-center justify-center">
            <Tab.TabContent id="ContentBuilding">
              <form onSubmit={onSubmit} className="flex flex-col items-center ">
                <Dropdown
                  label={"BUILDING"}
                  loop={buildingArr}
                  value={building}
                  onChange={(event) => setBuilding(event.target.value)}
                />
                <Dropdown
                  label={"FLOOR"}
                  loop={floorArr}
                  value={floor}
                  onChange={(event) => setFloor(event.target.value)}
                />
                <Dropdown
                  label={"DEPARTEMNT"}
                  loop={departmentArr}
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                />
                <div className="flex flex-col gap-2 pr-5 pt-5">
                  <QRCode
                    id="canvas"
                    size={165}
                    value={combaind}
                    bgColor="white"
                    fgColor="black"
                    level="H"
                  />
                  <button
                    type="button"
                    className="h-6 text-center text-slate-700 font-bold"
                    onClick={() => downloadQR(combaind)}
                    disabled={(building && floor && department) === ""}
                  >
                    {(building && floor && department) !== ""
                      ? <span className="text-green-600 hover:text-green-400">download</span>
                      : <span className="text-red-600">{combaind}</span>
                      }
                  </button>
                </div>
                <button
                  disabled={(building && floor && department) === ""}
                  className="mt-1 rounded-md w-full py-1 bg-slate-700 flex"
                  type="submit"
                >
                  <span className="w-full">Submit</span>

                  {
                  loader === true && <div className="loader-wrapper">
                    <div className="loader"/> 
                  </div>
                    }
                </button>
              </form>
            </Tab.TabContent>
            <Tab.TabContent id="ContentDevices">
              <p>
               # Create form to insert new Devices <br/>
               # the device could by directly assigned to office <br/>
               # deviceName and icon have the same value <br/>
               # Generate QR-Code for device start always with D and the model of device
              </p>
            </Tab.TabContent>
          </div>
        }
      />
      </div>
    </section>
  );
}
export const downloadQR = (Text: string) => {
  const element = getByID("canvas");
  if (!element) return;
  const canvas = document.createElement("canvas");
  const svgData = new XMLSerializer().serializeToString(element);
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx !== null && ctx.drawImage(img, 0, 0);
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = Text + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  img.style.objectFit = "contain";
  img.src = "data:image/svg+xml;base64," + btoa(svgData);
};
export default Inserting;
