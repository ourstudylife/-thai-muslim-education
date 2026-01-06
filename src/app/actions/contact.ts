// This file is now client-side safe and uses a PHP backend for shared hosting support.
// "use server" is removed to allow static export.

export async function submitContactForm(formData: any) {
    const { name, email, phone, message, preferredMethod } = formData

    // 1. Validate required fields client-side
    if (!name || !email || !phone || !message || !preferredMethod) {
        return { success: false, error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" }
    }

    try {
        // Prepare promises for both actions
        const phpMailPromise = fetch('/api/send-mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).then(res => res.json());

        const googleSheetPromise = fetch('https://script.google.com/macros/s/AKfycbzkk9BplJechqkNO7Ngf3fUvm23k5c7glbFtUPUQiW6LM-UOpORIE96UBsgBOlKpNY/exec', {
            method: 'POST',
            mode: 'no-cors', // CORS can be tricky with Apps Script, no-cors is often enough for simple submissions
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        });

        // Execute both
        const [phpResult] = await Promise.all([phpMailPromise, googleSheetPromise.catch(e => console.error("Sheet Sync Error:", e))]);

        if (!phpResult || !phpResult.success) {
            throw new Error(phpResult?.error || 'Failed to send email');
        }

        return phpResult;
    } catch (error: any) {
        console.error("Submission error:", error)
        return { success: false, error: error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล" }
    }
}
