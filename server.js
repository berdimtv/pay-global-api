const express = require("express");
const Stripe = require("stripe");
const app = express();

const stripe = new Stripe(process.env.STRIPE_KEY);

app.use(express.json());

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
