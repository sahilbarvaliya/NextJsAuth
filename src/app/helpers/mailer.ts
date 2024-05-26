import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpires: Date.now() + 3600000
                })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpires: Date.now() + 3600000
                })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "96b566e47a54bd",
                pass: "ec7c2af1b13cca"
            }
        });
``
        const mailOptions = {
            from: 'user',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
            <h1>${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h1>
            <p>${emailType === "VERIFY" ? "Click the link below to verify your email" : "Click the link below to reset your password"}</p>
            <a href="${emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyEmail?token=${hashedToken}` : `http://localhost:3000/reset?token=${hashedToken}`}">${emailType === "VERIFY" ? "Verify email" : "Reset password"}</a>
            <p> ${emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyEmail?token=${hashedToken}` : `http://localhost:3000/reset?token=${hashedToken}`}</p>
            `
        }

        const info = await transport.sendMail(mailOptions);

        return info;

    } catch (error: any) {
        throw new Error(error.message);
    }
}