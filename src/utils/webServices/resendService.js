/*
Title: resendService.js
Purpose: Wrapper for transactional emails sent with Resend.
*/
const { Resend } = require('resend');

const sendResetEmail = async function sendResetEmail(email, token, expirationMinutes) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('Missing RESEND_API_KEY environment variable.');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: 'Reset your Unitas password',
        html: `
            <p>Hello,</p>
            <p>Use this reset code to reset your password:</p>
            <p><strong>${token}</strong></p>
            <p>This code expires in ${expirationMinutes} minutes.</p>
        `,
    });

    if (error) {
        throw new Error(error.message || 'Resend could not send the reset email.');
    }
};

const sendAccountCreatedEmail = async function sendAccountCreatedEmail(email, fullName, resetUrl) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('Missing RESEND_API_KEY environment variable.');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: 'Your Unitas account is ready - Reset your password',
        html: `
            <p>Hello ${fullName || 'there'},</p>
            <p>Your Unitas account has been created successfully.</p>
            <p>To set your password, please visit <a href="${resetUrl}">Reset Password</a>.</p>
            <p>Then enter your email and follow the instructions on the page.</p>
            <p>If you did not request this account or need assistance, please contact your administrator.</p>
        `,
    });

    if (error) {
        throw new Error(error.message || 'Resend could not send the account creation email.');
    }
};

module.exports = {
    sendResetEmail,
    sendAccountCreatedEmail,
};
