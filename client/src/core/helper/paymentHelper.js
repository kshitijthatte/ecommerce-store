import { API } from "../../backend";
import axios from "axios";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty } from "./cartHelper";
import { Redirect } from "react-router-dom";
import { createOrder } from "./orderHelper";

export const displayRazorpay = async (products) => {
  const token = isAuthenticated() && isAuthenticated().token;
  const user = isAuthenticated() && isAuthenticated().user;

  const data = await axios
    .post(
      `${API}/razorpay/${user._id}`,
      { token, products },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((t) => t.data)
    .catch((err) => console.log("ERROR", err));

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.amount,
    name: "Company",
    description: "Wallet Transaction",
    order_id: data.id,
    handler: function (response) {
      // alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert(
        "Payment Successful \nYour ORDER ID :: " + response.razorpay_order_id
      );

      const orderData = {
        products,
        transaction_id: response.razorpay_payment_id,
        amount: data.amount / 100,
        user: user._id,
      };
      createOrder(user._id, token, orderData);
      cartEmpty(() => <Redirect to="/user/dashboard" />);
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: "9999999999",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
