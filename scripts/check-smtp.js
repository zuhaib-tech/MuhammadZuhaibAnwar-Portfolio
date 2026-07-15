#!/usr/bin/env node
const nodemailer = require('nodemailer');

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!user || !pass) {
  console.error('CONFIG_MISSING: SMTP_USER or SMTP_PASS is not set in environment');
  process.exit(2);
}

const transporter = nodemailer.createTransport({
  service: host === 'smtp.gmail.com' ? 'gmail' : undefined,
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  tls: { rejectUnauthorized: false },
});

console.log('Checking SMTP connection for', user, 'host', host, 'port', port);
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP_VERIFY_FAILED:', error && error.message ? error.message : error);
    process.exit(1);
  } else {
    console.log('SMTP_VERIFY_OK: Server accepts login');
    process.exit(0);
  }
});
