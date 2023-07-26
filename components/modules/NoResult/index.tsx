"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
  buttonText?: string;
}

const NoResult = ({
  title = "Kriterleriniz ile eslesen sonuc bulunamadi",
  subTitle = "Lutfen seceneklrinizi gozden gecirip tekrar deneyin ya da filtreleri temizlyin!.",
  showReset,
  buttonText,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className=" flex flex-col gap-2 justify-center items-center">
      <div className={"text-center"}>
        <div className={"text-md font-semibold "}>{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
      </div>
      <div className="w-48 mt-4">
        <Button variant={"secondary"} onClick={() => router.push("/search")}>
          {buttonText || "Filtreleri Temizle"}
        </Button>
      </div>
    </div>
  );
};

export default NoResult;
