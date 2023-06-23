import React from "react";
import dayjs from "dayjs";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import BillDetail from "./BillDetail";
import App from "../App";

export interface Bill {
  name: string;
  hospitalName: string;
  address: string;
  date: Date;
  amount: number;
}

interface Props {
  bills: Bill[];
}

const BillList = ({ bills }: Props) => {
  return (
    <div>
      <h1>Medical Bill History</h1>
      <ul className="list-group">
        {bills.map((bill, index) => (
          <li key={index} className="list-item">
            <div>
              <h3 text-align="center">
                <Link to={"/bill/" + index}>
                  {bill.name} @ {bill.hospitalName}
                </Link>
              </h3>
            </div>
            <div className="center top-element-formatting">
              Date: {dayjs(bill.date).format("MM/DD/YYYY")}
            </div>
            <div className="center second-word-formatting">
              Cost: ${bill.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillList;
