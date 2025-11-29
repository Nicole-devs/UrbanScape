const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    // 🛡️ SPAM BLOCK
    if (data['bot-field'] && data['bot-field'].trim().length > 0) {
      return { statusCode: 400, body: 'Spam detected' };
    }

    const { name, email, subject, message, website } = data;

    if (!name || !email || !subject || !message) {
      return { statusCode: 400, body: 'Missing fields' };
    }

    // 📧 SMTP CONFIG
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ndevs.office@gmail.com',
        pass: 'zwjpuhifvwdpbqms'
      }
    });

    const emailBody = `
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}
    Website: ${website || 'Not provided'}`;

    // Send email
    await transporter.sendMail({
      from: `"UrbanScape" <ndevs.office@gmail.com>`,
      to: 'ndevs.office@gmail.com',
      replyTo: email,
      subject: `New Contact: ${subject}`,
      text: emailBody
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: 'Server error' };
  }
};
