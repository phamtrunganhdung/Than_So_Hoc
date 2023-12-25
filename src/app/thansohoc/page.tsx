"use client";

import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
import { tableName } from "./constrant";
import { Button, DatePicker, Input } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import Alphabet from "./alphabet";
import SinChart from "./sinChart";
import PyramidChart from "./pyramidChart";
import Formula from "./formula";
import BirthdayNumber from "./birthdayNumber";
import NameNumber from "./nameNumber";
import { removeVietnameseTones } from "./utils";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

interface InputData {
  birthDay: string;
  name: string;
}
export interface Provider extends InputData {
  tableNumber: any[];
  listDay: number[];
  numberBirthDay: any[];
}

export default function ThanSoHoc() {
  const [state, setState] = useState<Provider>({
    tableNumber: [],
    listDay: [],
    numberBirthDay: [],
    birthDay: "",
    name: "",
  });
  const [inputData, setInputData] = useState<InputData>({
    birthDay: "1994-11-25",
    name: "Hoàng Phú Tùng",
  });
  const [dataP, setDataP] = useState<number | null>(null);
  const matrix = {
    row1: [3, 6, 9],
    row2: [2, 5, 8],
    row3: [1, 4, 7],
    col1: [1, 2, 3],
    col2: [4, 5, 6],
    col3: [7, 8, 9],
    cross1: [3, 5, 7],
    cross2: [1, 5, 9],
  };
  const printRef = useRef<any>(null);
  const primaryColor = "#eeb50a";

  const numberFromName = () => {
    let name = inputData.name;
    let nameReplace = removeVietnameseTones(name.replaceAll(" ", ""));
    let result: any[] = [];
    for (let i = 0; i < nameReplace.length; i++) {
      let findNum = tableName.find((x) =>
        x.key.some((s) => s.toLowerCase() == nameReplace[i].toLowerCase())
      )?.value;
      result.push(findNum);
    }
    return result;
  };

  const numberFromBirthDay = () => {
    let birthDateSplit = inputData.birthDay.split("-");
    let year = birthDateSplit[0];
    let month = birthDateSplit[1];
    let day = birthDateSplit[2];

    let result: any[] = [];
    for (let i = 0; i < year.length; i++) {
      if (parseInt(year[i]) > 0) result.push(year[i]);
    }
    for (let i = 0; i < month.length; i++) {
      if (parseInt(month[i]) > 0) result.push(month[i]);
    }
    for (let i = 0; i < day.length; i++) {
      if (parseInt(day[i]) > 0) result.push(day[i]);
    }

    return result;
  };

  const checkValidArrow = () => {
    const num = [...tableNumber, ...numberBirthDay.map((n) => parseInt(n))];
    const validArrow: string[] = [];

    Object.entries(matrix).map(([k, v]) => {
      if (v.every((i) => num.includes(i))) validArrow.push(k);
    });
    return validArrow;
  };

  const handleViewData = () => {
    if (!inputData.name) return;
    let tableNumber = numberFromName();
    let numberBirthDay = numberFromBirthDay();
    setState((prev) => ({
      ...prev,
      tableNumber: tableNumber,
      numberBirthDay: numberBirthDay,
      birthDay: inputData.birthDay,
      name: inputData.name,
    }));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleGetData = () => {
    const data: any = new FormData();
    const head: any = new Headers();
    data.append("entry.61077295", inputData.name);
    data.append(
      "entry.98253014",
      moment(inputData.birthDay, "YYYY-MM-DD").format("DD/MM/YYYY")
    );
    head.append("Access-Control-Allow-Origin", "http://pathlife.workvn.net");

    let request = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://docs.google.com/forms/d/e/1FAIpQLSdxxIDu0wyZR0b7HNVD7idvuO8y-ThkVzGGxAXO1Uufk7Chaw/formResponse",
      headers: {
        ...head,
      },
      data: data,
    };

    axios
      .request(request)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleViewData();
  }, []);

  useEffect(() => {
    var isCtrl = false;
    const checkCtrl = (e: any) => {
      if (e.keyCode == 17) isCtrl = false;
    };
    const keyDownHandlerComponent = (e: any) => {
      if (e.keyCode == 17) isCtrl = true;
      if (e.keyCode == 80 && isCtrl == true) {
        e.preventDefault();
        handlePrint();
      }
    };
    document.addEventListener("keyup", checkCtrl);
    document.addEventListener("keydown", keyDownHandlerComponent);

    return () => {
      document.removeEventListener("keyup", checkCtrl);
      document.removeEventListener("keydown", keyDownHandlerComponent);
    };
  }, []);

  const { tableNumber, numberBirthDay } = state;

  return (
    <main
      className="thansohoc-container flex flex-col items-center"
      style={{ alignItems: "center", paddingTop: 40, gap: 30 }}
    >
      <div className="form-input">
        <Input
          value={inputData.name}
          onChange={(e) => {
            setInputData((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <DatePicker
          showToday={false}
          allowClear={false}
          value={dayjs(inputData.birthDay, "YYYY-MM-DD")}
          format={"DD/MM/YYYY"}
          onChange={(_: any, dateString: string) => {
            setInputData((prev) => ({
              ...prev,
              birthDay: moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD"),
            }));
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            handleViewData();
            handleGetData();
          }}
        >
          Kiểm tra
        </Button>
      </div>
      <div className="flex flex-col items-center thansohoc" ref={printRef}>
        <NameNumber name={state.name} />
        <BirthdayNumber birthDay={state.birthDay} />
        <Formula birthDay={state.birthDay} getP={setDataP} />
        <div
          className="flex matrix-n-alphabet"
          style={{ gap: 60, alignItems: "center" }}
        >
          <div className="flex flex-col matrix">
            {checkValidArrow().map((arrow) => {
              return (
                <div className={`arrow ${arrow}`} key={arrow}>
                  {arrow.startsWith("col") ? (
                    <svg
                      width="16"
                      height="231"
                      viewBox="0 0 16 231"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 16H0L8 0L16 16Z" fill="white" />
                      <path d="M11 16H5V231H11V16Z" fill="white" />
                    </svg>
                  ) : arrow.startsWith("row") ? (
                    <svg
                      width="16"
                      height="316"
                      viewBox="0 0 16 316"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 16H0L8 0L16 16Z" fill="white" />
                      <path d="M11 16H5V316H11V16Z" fill="white" />
                    </svg>
                  ) : arrow.startsWith("cross") ? (
                    <svg
                      width="16"
                      height="356"
                      viewBox="0 0 16 356"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 16H0L8 0L16 16Z" fill="white" />
                      <path d="M11 16H5V356H11V16Z" fill="white" />
                    </svg>
                  ) : undefined}
                </div>
              );
            })}
            {Object.entries(matrix)
              .filter(([k, _]) => k.startsWith("row"))
              .map(([k, v]) => {
                return (
                  <div
                    className={`flex ${
                      k != "row3" ? "flex-row border-b-4" : ""
                    }`}
                    key={k}
                    style={{ borderColor: primaryColor }}
                  >
                    {v.map((ord) => {
                      return (
                        <div
                          className={`width ${
                            !matrix.col3.includes(ord) ? "border-r-4" : ""
                          }`}
                          key={ord}
                          style={{ borderColor: primaryColor }}
                        >
                          {tableNumber.filter((x) => x == ord).map((m) => m)}
                          <span className="text-red-500">
                            {numberBirthDay
                              .filter((x) => x == ord)
                              .map((m) => m)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        <SinChart dataP={dataP} />
        <PyramidChart birthDay={state.birthDay} />
      </div>
    </main>
  );
}
