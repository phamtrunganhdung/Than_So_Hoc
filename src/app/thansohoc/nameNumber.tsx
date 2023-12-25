import React, { useEffect, useState } from "react";
import { calcNumber, removeVietnameseTones } from "./utils";
import { tableName } from "./constrant";

export default function NameNumber({ name }: { name: string }) {
  if (!name) return <></>;
  const [nameNumber, setNameNumber] = useState<any>({});
  const [stringNum, setStringNum] = useState<string>("");
  const nameReplace = removeVietnameseTones(name);

  useEffect(() => {
    const res: any = {};
    let str: string = "";
    for (let i = 0; i < nameReplace.length; i++) {
      let findNum = tableName.find((x) =>
        x.key.some((s) => s.toLowerCase() == nameReplace[i].toLowerCase())
      )?.value;
      if (findNum) {
        res[i] = { key: findNum, value: nameReplace[i] };
        str += findNum;
      } else {
        res[i] = { key: -1, value: " " };
        str += "-1";
      }
    }
    setStringNum(str);
    setNameNumber(res);
  }, [nameReplace]);

  return (
    <div className="name-number-container">
      <div className="name-number flex flex-col">
        <div className="name flex">
          {Object.values(nameNumber).map((item: any, index: number) => {
            return (
              <div key={index} className="name-child text-blue-500">
                {item.value}
              </div>
            );
          })}
        </div>
        <div className="number flex">
          {Object.values(nameNumber).map((item: any, index: number) => {
            return (
              <div key={index} className="number-child text-blue-500">
                {item.key == -1 ? "" : item.key}
              </div>
            );
          })}
        </div>
        <div className="main-num flex">
          {stringNum.split("-1").map((item: string, index: number) => {
            return (
              <div
                key={index}
                className="main-num-child text-blue-500"
                style={{ width: 12 * item.length, marginRight: 12 }}
              >
                {calcNumber(
                  item
                    .split("")
                    .map((n) => parseInt(n))
                    .reduce((a, b) => a + b, 0)
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="name-num-result flex">
        <div>=</div>
        <div className="result">
          {calcNumber(
            stringNum
              .split("-1")
              .map((n) => {
                return calcNumber(
                  n
                    .split("")
                    .map((n) => parseInt(n))
                    .reduce((a, b) => a + b, 0)
                );
              })
              .reduce((a, b) => a + b, 0)
          )}
        </div>
      </div>
    </div>
  );
}
