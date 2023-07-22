import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    onChange(format(new Date(), "dd/MM/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    onChange(format(date, "dd/MM/yyyy"));
    setOpen(false);
  };

  return (
    <div className="w-full relative flex justify-center items-center ">
      <input
        value={value}
        readOnly
        className=" w-full px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-slate-500  focus:outline-none focus:ring cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      />

      <div
        ref={refOne}
        className="absolute  -translate-y-2/5 lg:top-[45px] left-1/2 transform -translate-x-1/2  z-[20]"
      >
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement cursor-pointer"
            onClick={() => setOpen(false)}
            minDate={new Date()}
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
