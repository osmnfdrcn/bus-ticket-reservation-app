"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Title from "@/components/ui/title";
import { useState } from "react";

type Props = {
  setCurrentPassenger: any;
  currentPassenger: {
    name: string;
    gender: string;
  };
};

const PassengerInfo = ({ currentPassenger, setCurrentPassenger }: Props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const handleButtonClick = () => {
    setCurrentPassenger({ name, gender });
    setName("");
    setGender("");
  };
  return (
    <>
      <Title text="Yolcu Bilgileri" />
      <div className="flex flex-col justify-start items-start gap-2 ">
        <Input
          type="text"
          label="Isim Soyisim"
          name={"name"}
          value={name || currentPassenger.name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!!currentPassenger?.name}
        />
        <div className="flex items-center justify-between w-full px-2">
          <Radio
            options={[
              { label: "Erkek", value: "erkek", name: "erkek" },
              { label: "Kadin", value: "kadin", name: "kadin" },
            ]}
            currentPassengerGender={gender || currentPassenger.gender}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGender(e.target.value);
            }}
          />
          <Button size={"small"} onClick={handleButtonClick}>
            {" "}
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default PassengerInfo;
