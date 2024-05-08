import { FormEvent, useEffect, useState } from "react";
import { departmentArr, buildingArr, floorArr } from "@/static_/static";
import QRCode from "react-qr-code";
import Link from "next/link";
import Tab, { getByID } from "@/components/Tab";
import restService from "@/service/rest.service";
import Dropdown from "@/components/Dropdown";
import Aside from "@/components/Aside";
import { useRouter } from "next/navigation";
import FormDevice from "@/components/FormDevice";
import InnerHTML from "@/components/InnerHTML";
import { icons } from "@/static_/icons";
import useMediaQuery from "@/components/MediaQuery";
import SmartDropdown from "@/components/SmartDropdown";

interface IFormCo {
  deviceName: string;
  model: string;
  manufacturer: string;
  purchaseDate: Date;
  serial_number: string;
  status: string;
  warrantyExpiry: Date;
  officeNr: string;
  icon: string;
}

function Inserting() {
  const router = useRouter();
  const match584 = useMediaQuery("(max-width:584px)");
  const [building, setBuilding] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [SSResponse, setSSResponse] = useState<any>({
    msg: "",
    generatedQr: "",
  });
  const combaind = building + floor + department;
  const [offices, setOffices] = useState([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [val, setVal] = useState<string>("");
  const [formCo, setFormCo] = useState<IFormCo>({
    deviceName: "",
    model: "",
    manufacturer: "",
    purchaseDate: new Date(),
    serial_number: "",
    status: "",
    warrantyExpiry: new Date(),
    officeNr: "",
    icon: ""
  });
  const handleSelectedItems = (event: any) => {
    event.preventDefault();
    const DETAILSTAG = getByID("ref-details");
    const parentElement = event.target.parentNode;
    const deviceName = parentElement.lastChild.innerText;
    setFormCo({ ...formCo, deviceName: deviceName });
    setOpened(false);
    return DETAILSTAG?.removeAttribute("open");
  };
  function stepBack() {
    setFormCo({
      deviceName: "",
      model: "",
      manufacturer: "",
      purchaseDate: new Date(),
      serial_number: "",
      status: "",
      warrantyExpiry: new Date(),
      officeNr: "",
      icon:""
    });
    setSSResponse({
      msg: "",
      generatedQr: "",
    });
    setLoading(false);
    setVal("");
  }
  const onSubmittDeviceData = async (event: FormEvent) => {
    event.preventDefault();
    const objData = {
      deviceName: formCo.deviceName,
      model: formCo.model,
      manufacturer: formCo.manufacturer,
      purchaseDate: formCo.purchaseDate,
      serial_number: formCo.serial_number,
      status: formCo.status,
      warrantyExpiry: formCo.warrantyExpiry,
      officeNr: formCo.officeNr,
      icon: formCo.icon,
    };

    return await restService
      .declareDevice(objData)
      .then((response) => {
        console.log(response);
        setSSResponse({
          msg: response.msg,
          generatedQr: response.generatedQr,
        });
        setLoading(true);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof IFormCo
  ) => {
    let value: string | Date | null = event.currentTarget.value;
    if (event.currentTarget.type === "date") {
      const inputDate = new Date(value);
      value = isNaN(inputDate.getTime()) ? "" : inputDate;
    }
    setFormCo({ ...formCo, [field]: value });
  };
  const handleClick = () => {
    const DETAILSTAG = getByID("ref-details");
    if (val) {
      setFormCo({ ...formCo, deviceName: val, icon: 'Other' });
    }
    setVal("");
    return DETAILSTAG?.removeAttribute("open");
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);
    const formData = { building, floor, department };
    await restService
      .declareOffice(formData)
      .then((res) => {
        if (!res) {
          return;
        }
        setLoader(false);
        return router.push(`/location/${combaind}`);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
    return setTimeout(() => {
      setLoader(false);
    }, 500);
  }
  useEffect(() => {
    async function retrieveOffices() {
      await restService
        .getAllOffices()
        .then((res: any) => {
          setOffices(res.data);
          console.log(res);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    retrieveOffices();
  }, []);
  return (
    <section className=" min-h-screen flex flex-col">
      <div className="sticky top-0 pl-4 h-20 flex  justify-between items-center _div_line ">
        <Link href="/">
          <p className=" text-4xl  ">
            <span className="text-slate-600">QR</span>
            <span className="text-slate-300">Swift</span>
          </p>
        </Link>
        <Aside />
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
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col items-center "
                >
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

                  <div className="flex flex-col gap-2  pt-5">
                    <QRCode
                      id="office-canvas"
                      size={165}
                      value={combaind}
                      bgColor="white"
                      fgColor="black"
                      level="H"
                    />
                    <button
                      type="button"
                      className="h-6 text-center text-slate-700 font-bold"
                      onClick={() => downloadQR(combaind, "office-canvas")}
                      disabled={(building && floor && department) === ""}
                    >
                      {(building && floor && department) !== "" ? (
                        <span className="text-green-600 hover:text-green-400">
                          download
                        </span>
                      ) : (
                        <span className="text-red-600">{combaind}</span>
                      )}
                    </button>
                  </div>
                  <button
                    disabled={(building && floor && department) === ""}
                    className="mt-1 rounded-md w-full py-1 bg-slate-700 flex items-center h-9"
                    type="submit"
                  >
                    <span className="w-full">Submit</span>

                    {loader === true && (
                      <div className="loader-wrapper">
                        <div className="loader" />
                      </div>
                    )}
                  </button>
                </form>
              </Tab.TabContent>
              <Tab.TabContent id="ContentDevices">
                <FormDevice
                  onSubmit={onSubmittDeviceData}
                  submitButton={
                    <div className="flex justify-end">
                      {!loading && (
                        <button type="submit" className="hover:-scale-x-100">
                          <InnerHTML Convert={icons.submitIcon} />
                        </button>
                      )}
                    </div>
                  }
                >
                  {!loading ? (
                    <>
                      <div className="flex flex-col">
                        <SmartDropdown
                          id="ref-details"
                          opened={opened}
                          value={formCo.deviceName}
                          val={val}
                          onChange={(event) => setVal(event.target.value)}
                          onClick={handleSelectedItems}
                          Toggle={() => setOpened(!opened)}
                          onClickButton={handleClick}
                        />
                        <FormDevice.Input
                          required={true}
                          type="text"
                          label="manufacturer"
                          value={formCo.manufacturer}
                          placeholder="enter manufacturer"
                          onChange={(event) =>
                            handleChange(event, "manufacturer")
                          }
                        />
                        <FormDevice.Input
                          required={true}
                          type="text"
                          label="model"
                          value={formCo.model}
                          placeholder="enter model"
                          onChange={(event) => handleChange(event, "model")}
                        />
                        <FormDevice.Menu
                          label="officeNr"
                          value={formCo.officeNr}
                          onChange={(event) => handleChange(event, "officeNr")}
                          loop={offices}
                          propertyId="officeId"
                          propertyName="officeNr"
                        />
                      </div>

                      <div className="flex flex-col">
                        <FormDevice.Input
                          required={true}
                          type="text"
                          label="serial number"
                          value={formCo.serial_number}
                          placeholder="enter serial number"
                          onChange={(event) =>
                            handleChange(event, "serial_number")
                          }
                        />

                        <FormDevice.Option
                          value={formCo.status}
                          onChange={(event) => handleChange(event, "status")}
                        />

                        <FormDevice.Input
                          required={true}
                          type="date"
                          label="Purchase-Date"
                          value={formCo.purchaseDate.toISOString().substr(0, 10)}
                          placeholder="enter purchase date"
                          onChange={(event) =>
                            handleChange(event, "purchaseDate")
                          }
                        />

                        <FormDevice.Input
                          required={false}
                          type="date"
                          label="Warranty Expiry"
                          value={formCo.warrantyExpiry.toISOString().substr(0, 10)}
                          placeholder="enter office number"
                          onChange={(event) =>
                            handleChange(event, "warrantyExpiry")
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 mt-2">
                      <QRCode
                        id="device-canvas"
                        size={165}
                        value={SSResponse.generatedQr}
                        bgColor="white"
                        fgColor="black"
                        level="H"
                      />
                      <p className="text-green-600 w-44 text-center text-sm">
                        {SSResponse.msg}
                      </p>
                      <button
                        type="button"
                        className="h-6 text-center text-slate-700 font-bold w-40"
                        onClick={() =>
                          downloadQR(SSResponse.generatedQr, "device-canvas")
                        }
                        disabled={!SSResponse.generatedQr}
                      >
                        {SSResponse.generatedQr}
                      </button>
                      <button
                        type="button"
                        onClick={stepBack}
                        className=" w-40 h-8 rounded-md border border-double border-stone-800 text-stone-600"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </FormDevice>
              </Tab.TabContent>
            </div>
          }
        />
      </div>
    </section>
  );
}
export const downloadQR = (Text: string, id: string) => {
  const element = getByID(id);
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
