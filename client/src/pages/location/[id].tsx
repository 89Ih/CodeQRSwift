import Aside from "@/components/Aside";
import List from "@/components/List";
import Toolbar from "@/components/Toolbar";
import restService from "@/service/rest.service";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const data = await restService.getAssigndDevices(id);
  return { props: { data } };
}

// const playAudio = () => {
//   const audioContext = new (window.AudioContext)();
//   const oscillator = audioContext.createOscillator();
//   oscillator.type = 'sawtooth';
//   oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz frequency (A4)
//   oscillator.connect(audioContext.destination);
//   oscillator.start();
//   setTimeout(() => {
//     oscillator.stop();
//   }, 750); // Play for 1 second
// };

const Location = ({ data }: any) => {
  const router = useRouter();
  const location = router.query.id;
  const [onShow, setOnShow] = useState<Boolean>(false);
  const [msg, setMsg] = useState<any | string>({ style: "", text: "" });

  const handleMSG = (style: string, text: string) => {
    setMsg({ style: style, text: text });
    return setTimeout(() => {
      return setMsg({ style: "", text: "" });
    }, 1000);
  };

  const onNewScanResult = async ({ data }: any) => {
    let scandQR = parseInt(data);
    restService
      .getAllDevices()
      .then((items) => {
        const checked = items.some(({ deviceId }: any) => deviceId === scandQR);
        if (!checked) {
          return handleMSG(
            "text-red-500",
            `This device with id:${scandQR} is not yet registered or cannot be assigned to this office.`
          );
        } else {
          items.map(({ deviceId, officeNr }: any) => {
            if (deviceId === scandQR) {
              if (officeNr === location) {
                handleMSG(
                  "text-yellow-400",
                  `This device is already assigned to this office.`
                );
                return;
              }
              if (officeNr === null || officeNr === "") {
                handleMSG(
                  "text-green-600",
                  `The device has been successfully assigned to the Office number: <b>${location}</b>`
                );
                return restService.assignDevice(deviceId, `${location}`);
              }
              if (officeNr !== null || officeNr !== "") {
                return handleMSG(
                  "text-red-500",
                  `This device is assigned to another office:  ${officeNr}`
                );
              }
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {}, [location]);

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
              Location: <strong>{location}</strong>
            </span>
            <span>
              Devices: <strong>{data.length}</strong>
            </span>
          </div>
          <Toolbar
            clss="pr-5">
              <Toolbar.Iconbar
                alt="Assign device to current office"
                src="/assets/add.svg"
                onClick={() => setOnShow(!onShow)}
              />
            </Toolbar>
      
        </div>
        <div className="m-5">
          <List
            devices={data}
            onShow={onShow}
            msg={
              <div
                className={`${msg.style}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            }
            onNewScanResult={onNewScanResult}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
