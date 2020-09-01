import React, { SelectHTMLAttributes } from "react";

interface selectDataOptions {
  value: string;
  label: string;
}

export interface SelectSearchProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: selectDataOptions[];
  col: number
}

const SelectSearch: React.FC<SelectSearchProps> = (props) => {
  return (
    <div className="form-group">
      <select
        id={props.id}
        className={`form-control select2 select2-hidden-accessible col-lg-${props.col}`}
        value={props.value}
        {...props}
      >
        <option value="" key={-1} disabled > Selecione um arquivo </option>
        {props.options.map((item: selectDataOptions, index) => (
          <option value={item.value} key={index}> {item.label}  </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSearch;
