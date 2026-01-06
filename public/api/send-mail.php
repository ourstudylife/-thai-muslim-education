<?php
// Prevent direct access to file
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Get raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Extract fields
$name = strip_tags($data['name'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = strip_tags($data['phone'] ?? '');
$whatsapp = strip_tags($data['whatsapp'] ?? '');
$lineId = strip_tags($data['lineId'] ?? '');
$preferredMethod = strip_tags($data['preferredMethod'] ?? '');
$message = $data['message'] ?? '';

// Validation
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

// Email Configuration
$to = "ourstudylife2022@gmail.com"; // Replace with your email if different
$subject = "New Contact Message from " . $name;

// Email Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Website Contact Form <noreply@thaimuslimeducation.com>" . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Email Body
$emailBody = "
<html>
<head>
<style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { padding: 20px; }
    h2 { color: #047857; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px; border-bottom: 1px solid #eee; }
    .label { font-weight: bold; }
    .msg-box { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e5e7eb; }
</style>
</head>
<body>
<div class='container'>
    <h2>New Inquiry from Website</h2>
    <table>
        <tr><td class='label'>Name:</td><td>{$name}</td></tr>
        <tr><td class='label'>Email:</td><td>{$email}</td></tr>
        <tr><td class='label'>Phone:</td><td>{$phone}</td></tr>
        <tr><td class='label'>WhatsApp:</td><td>" . ($whatsapp ?: "-") . "</td></tr>
        <tr><td class='label'>Line ID:</td><td>" . ($lineId ?: "-") . "</td></tr>
        <tr><td class='label'>Preferred Contact:</td><td>{$preferredMethod}</td></tr>
    </table>
    
    <div style='margin-top: 20px;'>
        <strong>Message:</strong>
        <div class='msg-box'>" . nl2br($message) . "</div>
    </div>
</div>
</body>
</html>
";

// --- Send Email ---
$mailSent = mail($to, $subject, $emailBody, $headers);

// Final Response
if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email.']);
}
?>