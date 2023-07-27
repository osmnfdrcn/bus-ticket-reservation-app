import React from "react";

type Props = {
  label?: string;
  type: string;
  name: string;
  isError?: string;
  errorMessage?: string | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
};

function Input({
  label,
  type,
  name,
  value,
  onChange,
  isError,
  errorMessage,
  placeholder,
  readOnly,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="flex items-center justify-between w-full">
        <label className="text-xs font-semibold text-gray-500" htmlFor={label}>
          {label}
        </label>
        {isError ? (
          <p className="text-xs text-right text-red-600">{errorMessage}</p>
        ) : null}
      </div>
      <input
        type={type}
        id={label}
        name={name}
        className="block w-full px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-slate-500  focus:outline-none focus:ring placeholder-gray-300 placeholder:text-xs"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}

export default Input;
