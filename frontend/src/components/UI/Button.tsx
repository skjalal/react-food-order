import React, { type PropsWithChildren } from "react";

import type { ButtonProps } from "../../util/data-types.ts";

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  textOnly,
  className,
  children,
  ...props
}) => {
  let cssClass = textOnly ? "text-button" : "button";
  if (className) {
    cssClass += " " + className;
  }
  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
