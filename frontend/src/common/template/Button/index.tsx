import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  col: number;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button type="button" className={`btn btn-block btn-default col-lg-${props.col}`} {...props}>
      {props.title}
    </button>
  );
};

export default Button;
