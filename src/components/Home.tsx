import React from "react";
import Form from "./Form";
import { useState } from "react";
import BillList from "./BillList";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import BillDetail from "./BillDetail";
import { Bill } from "./BillList";

interface Props {
  bills: Bill[];
  addBill: (bill: Bill) => void;
}

export const Home = ({ bills, addBill }: Props) => {
  const onSub = (bill: Bill) => {
    addBill(bill);
    setShowForm(false);
  };
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <>
          <Form onSubmit={(bill) => onSub(bill)}></Form>{" "}
          <button
            onClick={() => setShowForm(false)}
            className="btn btn-primary"
            type="reset"
          >
            Back
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-lg"
          type="button"
        >
          Add new bill
        </button>
      )}
      <BillList bills={bills}></BillList>
    </div>
  );
};
