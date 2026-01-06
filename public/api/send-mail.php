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

// --- Google Sheets Integration ---
$googleScriptUrl = "https://script.google.com/macros/s/AKfycbzkk9BplJechqkNO7Ngf3fUvm23k5c7glbFtUPUQiW6LM-UOpORIE96UBsgBOlKpNY/exec";
$sheetStatus = "Not attempted";

if (!empty($googleScriptUrl)) {
    $postData = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'whatsapp' => $whatsapp ?: "-",
        'lineId' => $lineId ?: "-",
        'preferredMethod' => $preferredMethod,
        'message' => $message
    ];
    $queryString = http_build_query($postData);

    // Method 1: file_get_contents (Primary)
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => $queryString,
            'timeout' => 15,
            'follow_location' => 1
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ];
    $context = stream_context_create($options);
    $response = @file_get_contents($googleScriptUrl, false, $context);

    if ($response !== false) {
        $sheetStatus = "Success (Standard Method) | Response: " . $response;
    } else {
        // Method 2: cURL (Fallback)
        $ch = curl_init($googleScriptUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $queryString);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response) {
            $sheetStatus = "Success (Backup Method) | Response: " . $response;
        } else {
            // Method 3: GET attempt (Last resort for testing)
            $testUrl = $googleScriptUrl . "?" . $queryString;
            $getResponse = @file_get_contents($testUrl, false, stream_context_create(['http' => ['timeout' => 5], 'ssl' => ['verify_peer' => false]]));
            if ($getResponse !== false) {
                $sheetStatus = "Partial Success (GET Method) | Response: " . $getResponse;
            } else {
                $sheetStatus = "FAILED ALL METHODS. Your host likely blocks outbound connections to Google. Error: " . ($error ?: "Connection Timeout");
            }
        }
    }
}

// Update Email Body with Debug Info for Admin
$debugInfo = "
    <hr style='margin-top: 40px; border: 0; border-top: 1px solid #ddd;'>
    <div style='font-size: 13px; color: #444; font-family: Arial, sans-serif; background: #f0fdf4; padding: 15px; border-radius: 8px;'>
        <strong style='color: #047857;'>[Admin Debug Info - Google Sheets]</strong><br><br>
        <strong>Status:</strong> {$sheetStatus}<br>
        <strong>Target URL:</strong> <a href='{$googleScriptUrl}' target='_blank'>Click here to test URL manually</a><br>
        <strong>PHP Version:</strong> " . phpversion() . "<br>
        <strong>Server Time:</strong> " . date('Y-m-d H:i:s') . "<br><br>
        <p style='font-size: 11px; color: #666;'>If status is 'Success' but Sheet is empty, check your Script permissions in Google Apps Script.</p>
    </div>
";

$adminEmailBody = str_replace("</body>", $debugInfo . "</body>", $emailBody);

// Send Email
$mailSent = mail($to, $subject, $adminEmailBody, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'sheet_status' => $sheetStatus]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email', 'sheet_status' => $sheetStatus]);
}
?>