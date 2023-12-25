import React, { useEffect, useState } from "react";
import Image from "next/image";
import sinChart from "@/assets/sinChart.svg";
import pArrow from "@/assets/positionArrow.svg";
import moment from "moment";

interface Position {
  key: number;
  value: number;
}
interface ActiveNum {
  position4: Position;
  position7: Position;
  positionY: Position;
}

export default function SinChart({ dataP }: { dataP: number | null }) {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [active, setActive] = useState<ActiveNum>({
    position4: {
      key: 0,
      value: 0,
    },
    position7: {
      key: 0,
      value: 0,
    },
    positionY: {
      key: 0,
      value: 0,
    },
  });

  const handleGetYearActive = (data: number) => {
    //data là số chủ đạo của năm
    const yearNow = parseInt(moment().format("YYYY"));
    if (data === 4) {
      return {
        p4: yearNow,
        p7: yearNow + 3,
      };
    } else if (data === 7) {
      return {
        p4: yearNow + 6,
        p7: yearNow,
      };
    } else {
      const res: any = {
        p4: 0,
        p7: 0,
      };
      for (let i = 0; i < num.length; i++) {
        if (num[i] == data) {
          // nếu số chủ > 4 => thì p4 = năm hiện tại + tịnh tiến đến 9 sau đó quay lại từ 1 -> 4
          // nếu số chủ < 4 => thì p4 = năm hiện tại + tịnh tiến đến 4
          res.p4 =
            data > 4 ? yearNow + (9 - num[i]) + 4 : yearNow + (4 - num[i]);
          // nếu số chủ > 7 => thì p7 = năm hiện tại + tịnh tiến đến 9 sau đó quay lại từ 1 -> 7
          // nếu số chủ < 7 => thì p7 = năm hiện tại + tịnh tiến đến 7
          res.p7 =
            data > 7 ? yearNow + (9 - num[i]) + 7 : yearNow + (7 - num[i]);
        }
      }
      return res;
    }
  };

  useEffect(() => {
    if (!dataP) return;
    if (dataP < 0 || dataP > 9) return;
    //Số chủ đạo của năm
    const numOfYear = dataP;
    const result = handleGetYearActive(numOfYear);

    setActive((prev: ActiveNum) => ({
      ...prev,
      position4: {
        key: 4,
        value: result.p4,
      },
      position7: {
        key: 7,
        value: result.p7,
      },
      positionY: {
        key: numOfYear,
        value: parseInt(moment().format("YYYY")), // hiển thị năm hiện tại theo con số chủ đạo của năm
      },
    }));
  }, [dataP]);

  const positionBox = (id: string, value: number) => {
    return (
      <div id={id} key={id} className="position">
        <Image src={pArrow} alt="positionArrow" />
        {value}
      </div>
    );
  };

  return (
    <div className="sinChart">
      <Image src={sinChart} alt="sinChart" />
      {num.map((n) => {
        return (
          <span
            className="sin-num"
            id={`sin-num-${n}`}
            key={n}
            style={{
              color: n == 4 || n == 7 ? "#bf0303" : "#8B5CF6",
            }}
          >
            {n}
            {n == active.positionY.key ? (
              positionBox("positionY", active.positionY.value)
            ) : n == active.position4.key ? (
              positionBox("position4", active.position4.value)
            ) : n == active.position7.key ? (
              positionBox("position7", active.position7.value)
            ) : (
              <></>
            )}
          </span>
        );
      })}
    </div>
  );
}
