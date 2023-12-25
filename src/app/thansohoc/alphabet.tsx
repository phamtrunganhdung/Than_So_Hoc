import React from "react";
export default function Alphabet() {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "",
  ];
  const THEAD = () => {
    const thead = [];
    for (let index = 1; index <= 9; index++) {
      thead.push(<th key={index}>{index}</th>);
    }
    return thead;
  };
  const TBODY = () => {};

  return (
    <div className="alphabet">
      <table>
        <thead>
          <tr>{THEAD()}</tr>
        </thead>
        <tbody>
          <tr>
            {alphabet.slice(0, 9).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
          <tr>
            {alphabet.slice(9, 18).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
          <tr>
            {alphabet.slice(18, alphabet.length).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
