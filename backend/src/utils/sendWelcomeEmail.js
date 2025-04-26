const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async ({ to, name }) => {
  try {
    const data = await resend.emails.send({
      from: 'Operations 360 <onboarding@operations360.dev>',
      to,
      subject: 'Welcome to Operations 360!',
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #f8f9fa; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://your-logo-url.com/logo.png" alt="Operations 360 Logo" style="width: 120px;" />
        </div>
        <h2 style="color: #343a40;">Welcome, ${name} 👋</h2>
        <p style="font-size: 16px; color: #495057;">
          We're thrilled to welcome you to <strong>Operations 360</strong> — your new all-in-one platform to streamline operations, boost productivity, and grow your manufacturing business.
        </p>
        <p style="font-size: 16px; color: #495057;">
          Your organization account has been successfully created, and you are set as the <strong>admin</strong>. You can now:
        </p>
        <ul style="color: #495057; padding-left: 20px;">
          <li>Manage inventory and production in real-time</li>
          <li>Track orders and billing efficiently</li>
          <li>Add employees and assign roles</li>
          <li>Automate workflows and monitor progress</li>
        </ul>
        <p style="font-size: 16px; color: #495057;">
          Get started by logging into your dashboard and exploring the features built to empower your operations.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://your-app-url.com/login" style="background-color: #007bff; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
        </div>
        <p style="font-size: 14px; color: #868e96;">
          If you have any questions or need help, feel free to reply to this email or reach out to our support team.
        </p>
        <p style="font-size: 16px; color: #343a40;">
          Cheers,<br/>The Operations 360 Team 🚀
        </p>
      </div>
      `,
    });

    console.log('Welcome email sent:', data);
    return data;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};

module.exports = sendWelcomeEmail;
