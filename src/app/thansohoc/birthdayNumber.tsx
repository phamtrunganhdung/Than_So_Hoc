import React, { useEffect } from "react";
import { calcNumber } from "./utils";
import moment from "moment";

export default function BirthdayNumber({ birthDay }: { birthDay: string }) {
  const dd = parseInt(moment(birthDay).format("DD"));
  const mm = parseInt(moment(birthDay).format("MM"));
  const yyyy = parseInt(moment(birthDay).format("YYYY"));

  return (
    <div className="flex gap-1 formula">
      <span>
        {birthDay
          ? moment(birthDay, "YYYY-MM-DD").format("DD/MM/YYYY")
          : "Birthday"}
      </span>
      <span>=</span>
      <span style={{ color: "#871414", fontWeight: 600 }}>
        {calcNumber(calcNumber(mm) + calcNumber(dd) + calcNumber(yyyy))}
      </span>
    </div>
  );
}
