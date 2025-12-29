import React from "react";

import type { InputProps } from "../../util/data-types.ts";

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} required />
    </p>
  );
};

export default Input;
