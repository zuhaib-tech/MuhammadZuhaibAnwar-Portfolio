require('dotenv').config({ path: '.env.local' });
const sgMail = require('@sendgrid/mail');

async function main() {
  const key = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.SENDGRID_FROM || process.env.SMTP_FROM;

  if (!key) {
    console.error('SENDGRID_API_KEY not set in .env.local — add it and re-run this script.');
    process.exit(1);
  }
  if (!from) {
    console.error('SENDGRID_FROM or SMTP_FROM must be set in .env.local');
    process.exit(1);
  }
  if (!to) {
    console.error('CONTACT_TO_EMAIL not set in .env.local');
    process.exit(1);
  }

  sgMail.setApiKey(key);

  const msg = {
    to,
    from,
    subject: 'Portfolio SendGrid test',
    text: 'This is a test message from your portfolio sendgrid integration.',
  };

  try {
    await sgMail.send(msg);
    console.log('SendGrid test email sent successfully to', to);
    process.exit(0);
  } catch (err) {
    console.error('SendGrid send failed:');
    if (err && err.response && err.response.body) console.error(err.response.body);
    else console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
}

main();
