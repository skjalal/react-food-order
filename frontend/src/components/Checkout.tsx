import React, { type JSX } from "react";
import Modal from "./UI/Modal.tsx";
import { useCart } from "../store/CartContext.tsx";
import Input from "./UI/Input.tsx";
import Button from "./UI/Button.tsx";
import { useUserProgress } from "../store/UserProgressContext.tsx";
import { useHttp } from "../hooks/useHttp.ts";
import { currencyFormatter } from "../util/formatting.ts";
import type { Customer, GenericApiResponse } from "../util/data-types.ts";
import ErrorPage from "./ErrorPage.tsx";

const requestConfig: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout: React.FC = () => {
  const { items, clearCart } = useCart();

  const { progress, hideCheckout } = useUserProgress();

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp<GenericApiResponse>(
    "http://localhost:3000/orders",
    {},
    requestConfig
  );

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity! * +item.price,
    0
  );

  const handleFinish = (): void => {
    hideCheckout();
    clearCart();
    clearData();
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const customerData = Object.fromEntries(fd.entries()) as Customer;

    sendRequest({
      order: {
        items,
        customer: customerData,
      },
    });
  };

  let actions: JSX.Element = (
    <>
      <Button type="button" textOnly onClick={hideCheckout}>
        Close
      </Button>
      <Button textOnly={false}> Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data.message && error === "") {
    return (
      <Modal
        open={progress === "checkout"}
        onClose={progress === "checkout" ? handleFinish : undefined}
      >
        <h1>Success!</h1>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via email within next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish} textOnly={false}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={progress === "checkout"}
      onClose={progress === "checkout" ? hideCheckout : undefined}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error !== "" && (
          <ErrorPage title="Failed to submit order!" message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
