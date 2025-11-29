require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: [
    'http://127.0.0.1:5000',
    'https://nicole-devs.github.io',
    'https://architecture-portfolio-6bxb.onrender.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));


// Store timestamps of last email sent per IP
const lastSentTimestamps = {};


// Configure transporter for Gmail SMTP (v7.x style)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.mail_address,
        pass: process.env.mail_pass,
    },
});


app.post('/send-email', async (req, res) => {
const userEmail = req.body.email?.toLowerCase().trim();


if (!userEmail) {
    return res.status(400).send('Email is required');
}

// const nameParts = req.body.name?.trim().split(/\s+/);
// if (!req.body.name || nameParts.length < 2) {
//     return res.status(400).send('Please enter both first and last name (e.g., "John Doe").');
// }

const now = Date.now();


// Rate limit by EMAIL (10s cooldown)
if (lastSentTimestamps[userEmail] && now - lastSentTimestamps[userEmail] < 10000) {
    return res.status(429).send('Please wait 10 seconds before sending another email.');
}


const { name, email, subject, message, website } = req.body;


const mailOptions = {
    from: process.env.mail_address,
    replyTo: `"${name}" <${userEmail}>`,
    to: process.env.mail_address,
    subject: 'New Contact Form',
    html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>Website:</strong> ${website}</p>
    `,
};
console.log('Form data received:', req.body);

try {
    // Send email (async/await - v7.x style)
    await transporter.sendMail(mailOptions);


    // Update timestamp on success
    lastSentTimestamps[userEmail] = now;


    res.send('Email sent successfully');
} catch (error) {
    console.error('Email error:', error);
    res.status(500).send('Error sending email');
}
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});