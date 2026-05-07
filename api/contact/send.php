<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_once __DIR__ . '/../_lib/smtp.php';
require_method('POST');

$body = read_json_body();
$name    = trim((string)($body['name']    ?? ''));
$email   = trim((string)($body['email']   ?? ''));
$phone   = trim((string)($body['phone']   ?? ''));
$message = trim((string)($body['message'] ?? ''));

if ($name === ''    || strlen($name) > 100)                json_error('Invalid name');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))            json_error('Invalid email');
if (strlen($phone) > 30)                                   json_error('Invalid phone');
if ($message === '' || strlen($message) > 2000)            json_error('Invalid message');

// Always persist first — we never lose a lead even if SMTP fails.
db()->prepare(
    'INSERT INTO contact_messages (name, email, phone, message, ip)
     VALUES (?, ?, ?, ?, ?)'
)->execute([$name, $email, $phone, $message, $_SERVER['REMOTE_ADDR'] ?? '']);

global $CONFIG;
$to      = (string)($CONFIG['contact_to'] ?? 'info@industryarch.com');
$subject = "Website contact — $name";
$bodyTxt = "New message from the IndustryArch website.\n\n"
         . "Name:    $name\n"
         . "Email:   $email\n"
         . "Phone:   " . ($phone !== '' ? $phone : '(not provided)') . "\n\n"
         . "Message:\n$message\n";

try {
    smtp_send($CONFIG['smtp'] ?? [], $to, $subject, $bodyTxt, $email);
    json_response(['ok' => true]);
} catch (Throwable $e) {
    // Lead is already in the DB, so we tell the client success but log the SMTP failure
    // so an admin can investigate without users seeing scary error messages.
    error_log('[contact] SMTP failed: ' . $e->getMessage());
    json_response(['ok' => true, 'mail_warning' => 'Message stored; email delivery delayed']);
}
