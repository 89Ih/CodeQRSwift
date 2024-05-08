import { FC, FormEvent, ReactNode, ChangeEvent } from "react"

interface InputProps {
  label: string
  value: string
  type: any
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  required: boolean
}
interface FormProps {
  children: ReactNode
  submitButton: ReactNode
  onSubmit: (event: FormEvent) => void
}
interface OptionProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
interface MenuProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  loop: any[];
  propertyName: string
  propertyId: string
}
const FormDevice: FC<FormProps> & { Input: FC<InputProps> } & { Option: FC<OptionProps> } & { Menu: FC<MenuProps> } = ({ children, submitButton, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col">
      <div className="flex flex-wrap flex-row  justify-evenly gap-2">{children}</div>
      <div className="w-full">{submitButton}</div>
    </form>
  );
}
const Input = ({ label, value, type, placeholder, onChange, required }: InputProps) => {
  return (
    <div className="_drp w-64 flex flex-col gap-1 mb-3">
      <label
        htmlFor={`static-${label}`}
        className="text-xs text-slate-700 font-bold uppercase  tracking-wide">
        {label}
        {" "}
        {required == true && <b className="text-red-700">*</b>}
      </label>
      <input
        maxLength={30}
        className={type === "date" ? '_formIptDate' : '_formIpt'}
        placeholder={placeholder}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event)}
      />

    </div>)

}
const Option = ({ value, onChange }: OptionProps) => {
  return (
    <div className="w-64 flex flex-col gap-1 mb-3">
      <label
        htmlFor={`static-status`}
        className="text-xs text-slate-700 font-bold uppercase  tracking-wide"
      >
        Status
      </label>
      <select
        value={value}
        onChange={onChange}
        className="_selectOpt"
        id="static-status">
        <option defaultValue="active"></option>
        <option key="active" value="active">active</option>
        <option key="inactive" value="inactive">inactive</option>
        <option key="repair" value="repair">repair</option>
      </select>
    </div>
  )
}
const Menu: FC<MenuProps> = ({ label, value, onChange, loop, propertyName, propertyId }) => {
  return (
    <div className="_drp w-full flex flex-col gap-1 mb-3">
      <label
        htmlFor={`static-${label}`}
        className="text-xs text-slate-700 font-bold uppercase  tracking-wide">
        {label}
        {" "}
        <b className="text-red-700">*</b>
      </label>
      <select

        value={value}
        onChange={(event) => onChange(event)}
        id={`static-${label}`}
        className="_selectOpt" >
        <option defaultValue="selected"></option>
        {loop.map((a: any) => (<option className="text-s" key={a[propertyId]} value={a[propertyName]}>{a[propertyName]}</option>))}

      </select>
    </div>
  )
}
FormDevice.Menu = Menu
FormDevice.Option = Option
FormDevice.Input = Input
export default FormDevice;