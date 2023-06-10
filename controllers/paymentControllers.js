const BigPromise = require("../middleware/BigPromise");
const stripe = require("stripe")(process.env.STRIPE_sk);
exports.stripePaymentkeys = BigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
    keys: process.env.STRIPE_Pk,
  });
});

exports.paymentGatewayStripe = BigPromise(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    // payment_method_types: ["card"],
    metadata: {
      integration_check: "accept_a_payment",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});
