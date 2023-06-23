import reactLogo from "./assets/react.svg";
import "./App.css";
import Form from "./components/Form";
import { useState } from "react";
import BillList from "./components/BillList";
import { Link, Routes, Route } from "react-router-dom";
import BillDetail from "./components/BillDetail";
import { Home } from "./components/Home";
import { Bill } from "./components/BillList";

function App() {
  const [bills, setBills] = useState([
    {
      name: "John Doe",
      hospitalName: "Overlake",
      address: "1234 Place",
      date: new Date(2022, 2, 19),
      amount: 100,
    },

    {
      name: "Mary Jane",
      hospitalName: "Swedish",
      address: "33 Blvd",
      date: new Date(2019, 6, 19),
      amount: 42,
    },
  ]);

  function addBill(bill: Bill) {
    setBills([...bills, { ...bill }]);
  }

  function changeBill(bill: Bill, index: number) {
    let newBills = [...bills];
    newBills[index] = bill;
    setBills(newBills);
  }

  return (
    <div>
      <>
        <Routes>
          <Route
            path="/"
            element={<Home addBill={addBill} bills={bills}></Home>}
          ></Route>
          <Route
            path={"/bill/:id"}
            element={<BillDetail bills={bills}></BillDetail>}
          ></Route>
          <Route
            path={"/bill/:id/edit"}
            element={
              <>
                <Form onEdit={changeBill} bills={bills}></Form>
                <Link to="/">
                  <button className="btn btn-primary">Back to home</button>
                </Link>
              </>
            }
          ></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
