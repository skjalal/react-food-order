import React from "react";
import type { ErrorPageProps } from "../util/data-types.ts";

const ErrorPage: React.FC<ErrorPageProps> = ({ title, message }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
