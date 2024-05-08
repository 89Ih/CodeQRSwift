import Aside from "@/components/Aside";
import restService from "@/service/rest.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceTable from "./table";

export default function Devices() {
 const [devices, setDevices] = useState<any[]> ([]);

 useEffect(()=>{
  restService.getAllDevices().then(item=>setDevices(item))
 
 },[])
  
  return (
    <div className=" min-h-screen flex flex-col justify-between">
      <div>
        <div className="sticky top-0 pl-4 h-20 flex  justify-between items-center _div_line">
          <Link href="/">
            <p className=" text-4xl  ">
              <span className="text-slate-600">QR</span>
              <span className="text-slate-300">Swift</span>
            </p>
          </Link>
          <Aside />
        </div>
        <div className="pl-5 mt-2 flex justify-between mb-2">
          <div className="h-14 text-slate-300 flex flex-col gap-1 ">
            <span>
              Devices: <strong>{devices.length === 0 ? 'No devices assigned to this location' : devices.length}</strong>
            </span>
          </div>
        </div>
        <div className="m-5">
            <DeviceTable devices={devices}/>
        </div>
      </div>
    </div>
  );
}

