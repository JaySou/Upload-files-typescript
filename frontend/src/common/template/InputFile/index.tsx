import React, {  InputHTMLAttributes } from 'react';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fname: string;
}

const InputFile: React.FC<InputFileProps> = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}> {props.label} </label>
      <div className="custom-file">
        <input 
          className="custom-file-input"
          type="file" 
          id={props.id} {...props} />
        <label className="custom-file-label" htmlFor={props.id}> {props.fname} </label>
      </div>
    </div>
  );
}

export default InputFile;