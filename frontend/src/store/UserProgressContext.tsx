import { createContext, useContext } from "react";

import type { UserProgressContextProps } from "../util/data-types.ts";

export const UserProgressContext = createContext<UserProgressContextProps>({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgress must be used within a UserProgressProvider"
    );
  }
  return context;
};
