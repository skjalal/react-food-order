import React, { type PropsWithChildren, useState } from "react";

import { UserProgressContext } from "./UserProgressContext.tsx";
import type { UserProgressContextProps } from "../util/data-types";

const UserProgressContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [userProgress, setUserProgress] = useState<string>("");
  const showCart = (): void => {
    setUserProgress("cart");
  };
  const hideCart = (): void => {
    setUserProgress("");
  };
  const showCheckout = (): void => {
    setUserProgress("checkout");
  };
  const hideCheckout = (): void => {
    setUserProgress("");
  };

  const userProgressCtx: UserProgressContextProps = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext value={userProgressCtx}>
      {children}
    </UserProgressContext>
  );
};

export default UserProgressContextProvider;
