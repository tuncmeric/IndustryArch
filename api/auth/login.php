<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');

$body = read_json_body();
$email = trim((string)($body['email'] ?? ''));
$password = (string)($body['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_error('Invalid email');
if (strlen($password) < 1) json_error('Password required');

$stmt = db()->prepare('SELECT id, email, password_hash, is_admin FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    // Generic message to avoid user enumeration.
    json_error('Invalid email or password', 401);
}

set_session_cookie((int)$user['id']);

json_response(['user' => [
    'id'       => (int)$user['id'],
    'email'    => $user['email'],
    'is_admin' => (bool)$user['is_admin'],
]]);
