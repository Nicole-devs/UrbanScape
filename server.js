const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Store timestamps of last email sent per IP
const lastSentTimestamps = {};

// Configure your transporter as before
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ndevs.office@gmail.com',
    pass: 'ohupaasysfgkhbty',
  },
});

app.post('/send-email', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  // Check if user sent email less than 10 seconds ago
  if (lastSentTimestamps[ip] && now - lastSentTimestamps[ip] < 10000) {
    return res.status(429).send('Please wait 10 seconds before sending another email.');
  }

  const { name, email, subject, comment } = req.body;

  const mailOptions = {
    from: email,
    to: 'ndevs.office@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Comment:</strong></p>
      <p>${comment.replace(/\n/g, '<br>')}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending email');
    }
    // Update timestamp on success
    lastSentTimestamps[ip] = now;

    res.send('Email sent successfully');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
