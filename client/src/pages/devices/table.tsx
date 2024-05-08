import Link from "next/link";

const formatFireBaseDate = (seconds: number, nanoseconds: number) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
function DeviceTable({devices}:any) {
    return (
        <div style={{ overflowX: "auto" }}>
            <table className="min-w-full border-collapse border-spacing-0 border border-slate-800">
            <caption>
                List of all Devices
            </caption>
            <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-sm text-left">
                    <th>Device-Id</th>
                    <th>Device Name</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Serial number</th>
                    <th>Status</th>
                    <th>Office number</th>
                    <th>Purchase Date</th>
                    <th>Warranty Expiry</th>
                    <th>operations</th>
                </tr>
            </thead>
            <tbody>
                { devices.map((d:any)=>(
                    <tr key={d.deviceId} className="text-sm text-left">
                        <td>{d.deviceId}</td>
                        <td>{d.deviceName}</td>
                        <td>{d.model}</td>
                        <td>{d.manufacturer}</td>
                        <td>{d.serial_number}</td>
                        <td>{d.status}</td>
                        <td>
                            <Link className="text-sky-600 underline" href={`location/${d.officeNr}`}>{d.officeNr}</Link>
                            {!d.officeNr && 'Unassiged'}
                        </td>
                        <td>{formatFireBaseDate(d.purchaseDate.seconds,d.purchaseDate.nanoseconds)}</td>
                        <td>{formatFireBaseDate(d.warrantyExpiry.seconds,d.warrantyExpiry.nanoseconds)}</td>
                        <td>__toolbar__</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default DeviceTable;