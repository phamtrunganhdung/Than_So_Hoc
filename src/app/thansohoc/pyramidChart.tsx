import React, { useEffect, useState } from "react";
import pyramid from "@/assets/pyramidChart.svg";
import Image from "next/image";
import moment from "moment";
import { calcNumber, calcNumberForFourthPeak } from "./utils";

interface Peak {
  p1: number | null;
  p2: number | null;
  p3: number | null;
  p4: number | null;
}

export default function PyramidChart({ birthDay }: { birthDay: string }) {
  const dd = parseInt(moment(birthDay).format("DD"));
  const mm = parseInt(moment(birthDay).format("MM"));
  const yyyy = parseInt(moment(birthDay).format("YYYY"));
  const [peak, setPeak] = useState<Peak>({
    p1: null,
    p2: null,
    p3: null,
    p4: null,
  });

  useEffect(() => {
    //Số chủ đạo của cuộc đời
    const mainNum: number = calcNumber(
      calcNumber(mm) + calcNumber(dd) + calcNumber(yyyy)
    );
    if (mainNum > 0) {
      setPeak({
        //đỉnh 1 = 36 - số chủ đạo cuộc đời
        p1: 36 - mainNum,
        //Các đỉnh khác cứ tuần tự + 9
        p2: 36 - mainNum + 9,
        p3: 36 - mainNum + 18,
        p4: 36 - mainNum + 27,
      });
    }
  }, [birthDay]);

  return (
    <div className="pyramidChart">
      <Image src={pyramid} alt="pyramidChart" />
      <label className="red-num" id="char-top1">
        {`${peak.p4}t`}
      </label>
      <label className="peak flex" id="num-top1">
        <span className="text-blue-500">
          {calcNumberForFourthPeak(calcNumber(mm) + calcNumber(yyyy))}
        </span>
        <span>-</span>
        <span className="red-num">
          {Math.abs(calcNumber(mm) - calcNumber(yyyy))}
        </span>
      </label>
      <label className="red-num" id="char-top2">
        {`${peak.p3}t`}
      </label>
      <label className="peak flex flex-col" id="num-top2">
        <span className="text-blue-500">
          {calcNumber(
            calcNumber(calcNumber(mm) + calcNumber(dd)) +
              calcNumber(calcNumber(dd) + calcNumber(yyyy))
          )}
        </span>
        <span className="red-num">
          {Math.abs(
            calcNumber(calcNumber(mm) + calcNumber(dd)) -
              calcNumber(calcNumber(dd) + calcNumber(yyyy))
          )}
        </span>
      </label>
      <label className="red-num" id="char-top3-l">
        {`${peak.p1}t`}
      </label>
      <label className="red-num" id="char-top3-r">
        {`${peak.p2}t`}
      </label>
      <label className="peak flex flex-col" id="num-top3-l">
        <span className="text-blue-500">
          {calcNumber(calcNumber(mm) + calcNumber(dd))}
        </span>
        <span className="red-num">
          {Math.abs(calcNumber(mm) - calcNumber(dd))}
        </span>
      </label>
      <label className="peak flex flex-col" id="num-top3-r">
        <span className="text-blue-500">
          {calcNumber(calcNumber(dd) + calcNumber(yyyy))}
        </span>
        <span className="red-num">
          {Math.abs(calcNumber(yyyy) - calcNumber(dd))}
        </span>
      </label>
      <label className="num-bot text-blue-500" id="num-bot-l">
        {calcNumber(mm)}
      </label>
      <label className="num-bot text-blue-500" id="num-bot-m">
        {calcNumber(dd)}
      </label>
      <label className="num-bot text-blue-500" id="num-bot-r">
        {calcNumber(yyyy)}
      </label>
    </div>
  );
}
