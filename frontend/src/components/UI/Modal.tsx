import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import type { ModalProps } from "../../util/data-types.ts";

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  className,
  onClose,
  children,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  let cssClass = "modal";
  if (className) {
    cssClass += " " + className;
  }

  useEffect(() => {
    const modal = dialog.current!;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={cssClass} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
