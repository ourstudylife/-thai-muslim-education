"use server"

import nodemailer from "nodemailer"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

export async function submitContactForm(formData: any) {
    const { name, email, phone, whatsapp, lineId, preferredMethod, message } = formData

    // 1. Validate required fields
    if (!name || !email || !phone || !message || !preferredMethod) {
        return { success: false, error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" }
    }

    console.log("Contact Form Data Received:", formData)

    const results = {
        email: { success: false, error: null as any },
        sheet: { success: false, error: null as any }
    }

    // --- TASK 1: SAVE TO GOOGLE SHEETS ---
    try {
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
            const SCOPES = [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file',
            ];

            const jwt = new JWT({
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                scopes: SCOPES,
            });

            const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwt);

            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0]; // Use the first sheet

            await sheet.addRow({
                Date: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
                Name: name,
                Email: email,
                Phone: phone,
                WhatsApp: whatsapp || "-",
                LineID: lineId || "-",
                PreferredContact: preferredMethod,
                Message: message
            });
            console.log("✅ Saved to Google Sheets")
            results.sheet.success = true;
        } else {
            console.warn("⚠️ Google Sheets credentials missing. Skipping save.")
            results.sheet.error = "Credentials missing";
        }
    } catch (error) {
        console.error("❌ Google Sheets Error:", error)
        results.sheet.error = error;
        // Don't throw, we still want to try sending email
    }

    // --- TASK 2: SEND EMAIL ---
    try {
        // Check for environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("⚠️ Email credentials not found in environment variables.")
            results.email.error = "Credentials missing";
            // Check if we saved to sheet at least?
            if (results.sheet.success) {
                return { success: true, message: "Saved to Sheet, but Email failed (config missing)." }
            }
            // Return success to simulate behavior if only testing UI
            return { success: true, message: "Simulation: Email config missing" }
        }

        // Create Transporter - using explicit SMTP settings
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // Remove any spaces from App Password
            },
        })

        // Send Email
        await transporter.sendMail({
            from: `"Thai Muslim Education Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #047857;">New Inquiry from Website</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>WhatsApp:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${whatsapp || "-"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Line ID:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lineId || "-"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Preferred Contact:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${preferredMethod}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px;">
                        <strong>Message:</strong>
                        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e5e7eb;">
                            ${message.replace(/\n/g, "<br>")}
                        </div>
                    </div>
                </div>
            `,
        })

        console.log("✅ Email sent successfully")
        results.email.success = true;

        return { success: true }
    } catch (error) {
        console.error("Email send error:", error)
        // If sheet saved but email failed, we might still consider it partial success?
        // But for user feedback, usually email is critical.
        return { success: false, error: "เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง" }
    }
}
