import Button from "@/components/ui/button";

const Seat = ({
  isInFixedSeats,
  value,
  isBookable,
  onClick,
}: {
  isInFixedSeats: { seat: number | undefined; gender: string | undefined };
  value: number | undefined;
  isBookable: boolean;
  onClick: () => void;
}) => {
  let style;

  if (isInFixedSeats?.seat === value) {
    style =
      isInFixedSeats.gender === "kadin"
        ? "p-2 rounded-full text-xs font-semibold bg-pink-600 text-white cursor-not-allowed"
        : isInFixedSeats.gender === "erkek"
        ? "p-2 rounded-full text-xs font-semibold bg-blue-600 text-white cursor-not-allowed"
        : "p-2 rounded-full text-xs font-semibold bg-white cursor-pointer";
  } else {
    isBookable // reservasyon icinde ve erkek ise, reservasyon icinde ve kadin ise
      ? (style =
          "p-2 rounded-full text-xs font-semibold  bg-slate-100 cursor-pointer text-slate-600")
      : (style =
          "p-2 rounded-full text-xs font-semibold bg-slate-600 text-white cursor-not-allowed");
  }

  return (
    <div className={style} onClick={onClick}>
      {value}
    </div>
  );
};

export default Seat;
