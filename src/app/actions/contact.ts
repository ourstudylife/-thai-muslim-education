// This file is now client-side safe and uses a PHP backend for shared hosting support.
// "use server" is removed to allow static export.

export async function submitContactForm(formData: any) {
    const { name, email, phone, message, preferredMethod } = formData

    // 1. Validate required fields client-side
    if (!name || !email || !phone || !message || !preferredMethod) {
        return { success: false, error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" }
    }

    try {
        const response = await fetch('/api/send-mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok')
        }

        return result
    } catch (error: any) {
        console.error("Submission error:", error)
        return { success: false, error: error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล" }
    }
}
