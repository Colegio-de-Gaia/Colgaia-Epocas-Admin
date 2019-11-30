import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import { useField } from "@rocketseat/unform";

import "react-datepicker/dist/react-datepicker.css";

export default function ReactDatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.selected",
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    });
  }, [ref.current, fieldName]);

  return (
    <>
      <DatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        className="form-control col-12"
      />
      {error && <span>{error}</span>}
    </>
  );
}
