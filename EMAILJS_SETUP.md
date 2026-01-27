# EmailJS Setup for Contact Form

This document explains how to configure EmailJS for the contact form functionality.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from your client-side JavaScript code without exposing your email credentials or requiring a backend server.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create an Email Service

1. After logging in, go to the "Email Services" section
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (it will look like `service_xxxxxxxxx`)

### 3. Create an Email Template

1. Go to the "Email Templates" section
2. Click "Create New Template"
3. Use the following template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the Svasam contact form.
```

4. Note down your **Template ID** (it will look like `template_xxxxxxxxx`)

### 4. Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (it will look like a long string of characters)

### 5. Update the Contact Component

Open `src/pages/Contact.jsx` and replace the placeholder values with your actual EmailJS credentials:

```javascript
// Replace these with your actual EmailJS credentials
const serviceId = 'service_your_actual_service_id';
const templateId = 'template_your_actual_template_id';
const userId = 'your_actual_public_key';
```

### 6. Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out the form and click "Send Message"
4. Check your email (the one connected to EmailJS) for the test message

## Important Notes

- **Security**: Your Public Key is safe to include in client-side code
- **Free Plan**: EmailJS has a free tier with 200 emails/month
- **Custom Domain**: For production, consider using a custom email service domain
- **Spam Protection**: Consider adding reCAPTCHA if you receive spam

## Troubleshooting

### Common Issues

1. **"Email is not sent" error**
   - Check that your Service ID, Template ID, and Public Key are correct
   - Ensure your email service is properly connected

2. **Template variables not working**
   - Make sure your template variables match exactly: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`

3. **Email not received**
   - Check your spam folder
   - Verify the email service is active in EmailJS dashboard

### Debug Mode

You can add console.log statements to debug:

```javascript
console.log('Sending email with params:', templateParams);
const result = await emailjs.send(serviceId, templateId, templateParams, userId);
console.log('Email sent result:', result);
```

## Alternative Solutions

If you prefer not to use EmailJS, consider:

1. **Backend API**: Create a Node.js/Express backend with nodemailer
2. **Form Services**: Use services like Formspree, Netlify Forms, or Getform
3. **Serverless Functions**: Use Vercel/Netlify serverless functions

## Support

For EmailJS-specific issues, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
