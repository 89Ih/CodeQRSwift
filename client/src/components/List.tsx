import restService from "@/service/rest.service";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import QrReader from "./QrReader";
import useMediaQuery from "./MediaQuery";
import classes from "../styles/list.module.css"

const unassignDevice = async (id: number) => {
  try {
    await restService.unassignDeviceById(id);
  } catch (error) {
    console.error("Error handling update:", error);
  }
};
function List({ devices, onShow,setMsg,msg ,onNewScanResult }: any) {
  const match1100 = useMediaQuery("(max-width:1100px)");
  const match750 = useMediaQuery("(max-width:750px)");
  const [deviceSet, setDeviceSet] = useState<any>({});
  const [query, setQuery] = useState<string>("");
  const {
    deviceId,
    icon,
    purchaseDate,
    warrantyExpiry,
    status,
    serial_number,
    deviceName,
    manufacturer,
    model,
  } = deviceSet;
  const retrieveById = (id: any) => {
    return devices.filter((item: any) => {
      if (item.deviceId === id) {
        return setDeviceSet(item);
      }
    });
  };
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  useEffect(()=>{},[match750,match1100 ]);
  return (
    <div>
      {onShow === true ? (
        <div className={`flex flex-col items-center gap-3`}>
          <QrReader handleNav={onNewScanResult} />
          <p>{msg}</p>
        </div>
        ):(
        <div className={`${classes._list_container}  border  border-stone-900 border-solid rounded-md _fc`}>
          {/* #LFC */}
          <div>
            <div className={`flex items-center border-b-4 border-double border-slate-700  pl-2 gap-2 _bg-trans h-10`}>
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <input
                value={query}
                onChange={handleQuery}
                type="text"
                className="h-10 w-full bg-transparent text-slate-50 text-md ipt _placeholder"
                placeholder="Search device :"
              />
            </div>
            <ul className={classes.device_container}>
              {devices
                .filter(({ model }: any) =>
                  model.toLowerCase().includes(query.toLowerCase())
                )
                .map(({ model, deviceId }: any) => (
                  <li
                    key={deviceId}
                    className={`text-slate-200  hover:bg-sky-700 flex items-center h-8 p-2 ${match1100 &&'text-sm'}`}
                    onClick={() => retrieveById(deviceId)}
                  >
                    <h5>{model}</h5>
                  </li>
                ))}
            </ul>
          </div>
          {/* #LLC */}
          <div>
            {icon && (
              <>
                <div className={`w-1/4  flex flex-col items-center justify-center gap-2 ml-2 ${match750 && 'my-1'}`}>
                    <Image
                      priority
                      src={`/assets/${icon}.svg`}
                      alt={icon}
                      width={250}
                      height={250}
                      className={classes.Image_scale}
                    />
                    <em className={` ${match750 ?" text-xs":"text-sm"}`}>
                      <b className="text-slate-600">SN//: </b>
                      {serial_number}
                    </em>        
                </div>
                <div className={`flex flex-col gap-1 items-center justify-center ${match750 ?'px-1 w-full':'px-7 w-2/4 '}`}>
                  {deviceName && (
                    <>
                      <p className={classes.tpy}>
                        <span>Device :</span>
                        {deviceName}
                        <span></span>
                      </p>
                      <p className={classes.tpy}>
                        <span>Manufacturer :</span>
                        <span>{manufacturer}</span>
                      </p>
                      <p className={classes.tpy}>
                        <span>Model :</span>
                        <span>{model}</span>
                      </p>
                  {match1100 && 
                  <><p className={classes.tpy}>
                        <span>Status :</span>
                        <span>{status}</span>
                      </p>
                      <p className={classes.tpy}>
                        <span>Purchase Date :</span>
                        <span>{purchaseDate}</span>
                      </p>
                      <p className={classes.tpy}>
                        <span>Warranty Expiry :</span>
                        <span>{warrantyExpiry}</span>
                      </p>
                      </>}
                    </>
                  )}
                </div>
                <div className={`flex flex-col justify-between items-end  gap-1 ${match750 ?'w-full':'w-1/4 pb-2'}`}>
                  <Toolbar clss="flex p-2 gap-1">
                    <Toolbar.Iconbar
                      alt="Delete"
                      src="/assets/Delete.svg"
                      onClick={() => unassignDevice(deviceId)}
                    />
                  </Toolbar>
                  {
                    !match1100 && 
                    <div style={{ width: "230px" }}>
                      <div className="flex gap-2">
                      <Image
                        width={22.5}
                        height={22.5}
                        src={`/assets/Status.svg`}
                        alt="Status"
                      />
                      <p className="text-sm flex gap-1 items-center justify-center h-6">
                        <b>Status :</b>
                        <span>{status}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        width={22.5}
                        height={22.5}
                        src={`/assets/PurchaseDate.svg`}
                        alt="Purchase Date"
                      />
                      <p className="text-sm flex gap-1 items-center justify-center h-6">
                        <b>Purchase Date :</b>
                        <span>{purchaseDate}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        width={22.5}
                        height={22.5}
                        src={`/assets/WarrantyExpiry.svg`}
                        alt="Warranty Expiry"
                      />
                      <p className="text-sm flex gap-1 items-center justify-center h-6">
                        <b>Warranty Expiry :</b>
                        <span>{warrantyExpiry}</span>
                      </p>
                    </div>
                  </div>
                  }
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;

