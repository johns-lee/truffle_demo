import React, { PropsWithRef } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Bill } from "./BillList";

interface Props {
  bills: Bill[];
}

const BillDetail = ({ bills }: Props) => {
  let { id } = useParams();
  if (typeof id === "undefined") {
    return <div>id undefined</div>;
  }

  let intId = parseInt(id);

  if (intId >= bills.length || intId < 0 || isNaN(intId)) {
    return <div>invalid id</div>;
  }
  return (
    <div className="list-item text-center">
      <div>
        <h3 text-align="center">
          {bills[intId].name} @ {bills[intId].hospitalName}
        </h3>
      </div>
      <div className="center ">
        Date: {dayjs(bills[intId].date).format("MM/DD/YYYY")}
      </div>
      <div className="center">Cost: ${bills[intId].amount}</div>
      <div className="center ">Address: {bills[intId].address}</div>
      <br></br>
      <Link to={"/bill/" + intId + "/edit"}>
        <button className="btn btn-primary">Edit</button>
      </Link>
      <br></br>
      <Link to="/">
        <button className="btn btn-primary">Back to home</button>
      </Link>
    </div>
  );
};

export default BillDetail;
