import React, { useEffect } from "react";
import { calcNumber } from "./utils";
import moment from "moment";

export default function Formula({
  birthDay,
  getP,
}: {
  birthDay: string;
  getP: any;
}) {
  const dd = parseInt(moment(birthDay).format("DD"));
  const mm = parseInt(moment(birthDay).format("MM"));
  //Số chủ đạo của năm hiện tại
  const yyyy = parseInt(moment().format("YYYY"));

  useEffect(() => {
    getP(calcNumber(calcNumber(mm) + calcNumber(dd) + calcNumber(yyyy)));
  }, [birthDay]);
  return (
    <div className="flex gap-1 formula">
      <span>
        P<span style={{ fontSize: 10 }}>{yyyy}</span>
      </span>
      <span>=</span>
      <span>{calcNumber(mm)}</span>
      <span>+</span>
      <span>{calcNumber(dd)}</span>
      <span>+</span>
      <span>{calcNumber(yyyy)}</span>
      <span>=</span>
      <span style={{ color: "#871414", fontWeight: 600 }}>
        {calcNumber(calcNumber(mm) + calcNumber(dd) + calcNumber(yyyy))}
      </span>
    </div>
  );
}
