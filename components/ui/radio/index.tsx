"use client";

import { useState } from "react";

type Props = {
  options: {
    value: string;
    name: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPassengerGender: string;
};

const Radio = ({ options, onChange, currentPassengerGender }: Props) => {
  return (
    <div className="main w-full flex rounded-md bg-white overflow-hidden  select-none">
      {options.map((o) => (
        <label key={o.name} className="flex radio p-2 cursor-pointer">
          <input
            className="my-auto checkbox appearance-none opacity-50  focus:opacity-100 focus:ring-3 focus:ring-offset-3 focus:ring-blue-700 focus:outline-none checked:border-none "
            type="radio"
            name={o.name}
            value={o.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            checked={o.value === currentPassengerGender}
          />
          <div className="title px-2">{o.label}</div>
        </label>
      ))}
    </div>
  );
};

export default Radio;
