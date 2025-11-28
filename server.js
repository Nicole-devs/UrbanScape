app.post('/send-email', async (req, res) => {
  const userEmail = req.body.email?.toLowerCase().trim();

  if (!userEmail) {
    return res.status(400).send('Email is required');
  }

  const now = Date.now();

  // Rate limit by EMAIL (10s cooldown)
  if (lastSentTimestamps[userEmail] && now - lastSentTimestamps[userEmail] < 10000) {
    return res.status(429).send('Please wait 10 seconds before sending another email.');
  }

  const { name, subject, comment } = req.body;

  const mailOptions = {
    from: userEmail,
    to: 'ndevs.office@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Comment:</strong></p>
      <p>${comment.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    lastSentTimestamps[userEmail] = now;
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).send('Error sending email');
  }
});