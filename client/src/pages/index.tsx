import { useRouter } from "next/navigation";
import restService from "@/service/rest.service";
import QrReader from "@/components/QrReader";
import Aside from "@/components/Aside";
import { useEffect } from "react";

export default function Home({ data }: any) {

  const router = useRouter();

  const onNewScanResult = async (QrNr: any) => {
    const num = QrNr.data;
    console.log(num);

    const filterd = data.some((item: any) => {
      return item.officeNr === num;
    });
    if (filterd === true) {
      return router.push(`/location/${num}`);
    }
    return router.refresh();
  };
  useEffect(()=>{

  },[])
  return (
    <div className="flex flex-col justify-evenly gap-16 w-full">
      <div className=" h-20 flex flex-col justify-center  w-full _div_line ">
        <div className="flex justify-center w-full " >
          <p className=" text-4xl  ">
            <span className="text-slate-600">QR</span>
            <span className="text-slate-300">Swift</span>
          </p>
        </div>
        <div className="flex flex-col items-end ">
          <Aside />
        </div>
      </div>
      <div className={`flex  flex-col`} >
        <QrReader handleNav={onNewScanResult} />
      </div>
    </div>

  );
}

Home.getInitialProps = () => restService.getAllOffices();
