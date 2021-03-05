const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  let amount = 0;
  products.map((product) => {
    amount = amount + product.price * product.count;
  });

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  razorpay.orders
    .create(options)
    .then((response) => {
      // console.log(response);

      return res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    })
    .catch((err) => {
      console.log(err);
      return err.json({ error: "Payment Failed" });
    });
};
