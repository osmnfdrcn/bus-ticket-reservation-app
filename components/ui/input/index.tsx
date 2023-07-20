import React from "react";

type Props = {
  label: string;
  type: string;
  name: string;
  isError?: string;
  errorMessage?: string | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  type,
  name,
  value,
  onChange,
  isError,
  errorMessage,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-1 w-full mb-4">
      <div className="flex items-center justify-between w-full">
        <label className="text-slate-600 text-xs " htmlFor={label}>
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
        className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-slate-500  focus:outline-none focus:ring"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={value}
      />
    </div>
  );
}

export default Input;
