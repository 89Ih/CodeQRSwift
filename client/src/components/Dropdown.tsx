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
        <div className="w-full mb-2">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={`static-${label}`}
            >
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(event) => onChange(event)}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`static-${label}`}
                >   <option defaultValue="selected"></option>
                    {loop.map((a) => (<option key={a.value} value={a.value}>{a.title}</option>))}

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;