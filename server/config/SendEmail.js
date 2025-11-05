import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, html) => {
    try {
        // Create a transporter object using SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use a mail service (e.g., Gmail, Outlook) or SMTP server
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

const sendEmailFun = async (to, subject, text, html) => {
    const result = await sendEmail(to, subject, text, html);
    return result.success;
};

export default sendEmailFun;