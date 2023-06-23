import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bill } from "./BillList";
import { useParams } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  hospitalName: z.string().min(1, { message: "Hospital name required" }),
  address: z.string().min(1, { message: "Address required" }),
  date: z.coerce.date(),
  amount: z
    .number({ invalid_type_error: "Cost required" })
    .positive({ message: "Invalid age" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit?: (data: FormData) => void;
  onEdit?: (bill: Bill, index: number) => void;
  bills?: Bill[];
}

const Form = ({ onSubmit, bills, onEdit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  let intId = 0;
  let { id } = useParams();
  let editing = false;
  if (typeof id !== "undefined") {
    editing = true;
    intId = parseInt(id);

    if (bills && (intId >= bills.length || intId < 0 || isNaN(intId))) {
      return <div>invalid id</div>;
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (editing && onEdit) {
          onEdit(data, intId);
        } else if (onSubmit) {
          onSubmit(data);
        }
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Patient Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
          // defaultValue={editing && bills !== undefined ? bills[intId].name : ""}
          defaultValue={editing && bills ? bills[intId].name : ""}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Hospital Name
        </label>
        <input
          {...register("hospitalName")}
          type="text"
          className="form-control"
          defaultValue={editing && bills ? bills[intId].hospitalName : ""}
        />
        {errors.hospitalName && (
          <p className="text-danger">{errors.hospitalName.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          className="form-control"
          defaultValue={editing && bills ? bills[intId].address : ""}
        />
        {errors.address && (
          <p className="text-danger">{errors.address.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Date of Service
        </label>
        <input {...register("date")} type="date" className="form-control" />
        {errors.date && <p className="text-danger">{errors.date.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Bill Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          className="form-control"
          defaultValue={editing && bills ? bills[intId].amount : ""}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message} </p>
        )}
      </div>
      <label htmlFor="" className="form-label">
        Image of Bill
      </label>
      <input type="file" className="form-control" />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
