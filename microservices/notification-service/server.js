const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5001; // Note: This runs on port 5001, separate from your main app (5000)

app.use(express.json());
app.use(cors());

// The Endpoint that the Main Server will call
app.post("/notify", (req, res) => {
  const { email, orderId } = req.body;

  // Simulate sending an email (Log to console)
  console.log(
    `\n📧 [NOTIFICATION SERVICE] Sending confirmation email to ${email} for Order #${orderId}...`,
  );
  console.log(`✅ Email Sent Successfully!`);

  res.json({ message: "Notification processed" });
});

app.listen(PORT, () => {
  console.log(`🔔 Notification Microservice running on port ${PORT}`);
});
