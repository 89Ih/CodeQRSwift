import { ChangeEvent, FC } from "react"
interface dropdownProps {
    label: string
    value: string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    loop:
    {
        title: string,
        value: string
    }[];

}

const Dropdown: FC<dropdownProps> = ({ label, value, onChange, loop }) => {
    return (
        <div className="_drp w-full flex flex-col gap-1 mb-3">
            <label 
                htmlFor={`static-${label}`} 
                className="text-xs text-slate-700 font-bold uppercase  tracking-wide">
                    {label} 
                <b className="text-red-700">*</b>
            </label>
            <select
                value={value}
                onChange={(event) => onChange(event)}
                id={`static-${label}`}
                className="_selectOpt" >
                <option defaultValue="selected"></option>
                {loop.map((a) => (<option key={a.value} value={a.value}>{a.title}</option>))}
            </select>
        </div>);
}

export default Dropdown;