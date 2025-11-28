exports.handler = async (event) => {
  const { name, email, subject, message, website } = JSON.parse(event.body);

  const emailBody = `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
Website: ${website}
  `;

  // Send custom email via SMTP/API (SendGrid/Mailgun/etc)
  // From: "${name} <noreply@yoursite.com>"

  return { statusCode: 200 };
};
