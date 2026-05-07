<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');

$body = read_json_body();
$email = trim((string)($body['email'] ?? ''));
$password = (string)($body['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_error('Invalid email');
if (strlen($password) < 8) json_error('Password must be at least 8 characters');
if (strlen($password) > 72) json_error('Password too long');

// Check for existing user (race-safe enough at this scale via UNIQUE constraint below).
$stmt = db()->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) json_error('An account with this email already exists', 409);

$hash = password_hash($password, PASSWORD_DEFAULT);
$ins = db()->prepare('INSERT INTO users (email, password_hash, is_admin) VALUES (?, ?, 0)');
$ins->execute([$email, $hash]);
$id = (int)db()->lastInsertId();

set_session_cookie($id);

json_response(['user' => [
    'id'       => $id,
    'email'    => $email,
    'is_admin' => false,
]]);
