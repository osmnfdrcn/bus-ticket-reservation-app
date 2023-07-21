import { capitalizeFirstLetter } from "@/helpers/capitilize";

type SelectProps = {
  label?: string;
  value?: string;
  options: { id: string; name: string; slug?: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isError?: boolean;
  errorMessage?: string | undefined;
  name: string;
  placeHolder: string;
};
const Select = ({
  label,
  value,
  options,
  onChange,
  isError,
  errorMessage,
  name,
  placeHolder,
}: SelectProps) => {
  return (
    <div className="relative flex flex-col items-start gap-1 col-span-2 sm:col-span-1 w-full">
      <label htmlFor={label} className="w-full">
        <span className="text-slate-600 text-xs">{label}</span>
        {isError ? (
          <p className="text-xs text-right text-red-600">{errorMessage}</p>
        ) : null}
        <select
          name={name}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
          className="block w-full px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-slate-500  focus:outline-none focus:ring "
        >
          <option className="text-xs" value={""}>
            {placeHolder}
          </option>
          {options.map((option) => (
            <option key={option.id} className="text-xs " value={option.name}>
              {capitalizeFirstLetter(option.name)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
