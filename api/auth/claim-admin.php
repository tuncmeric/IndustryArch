<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');

$user = require_auth();

// Allow promotion only if no admin exists yet.
$count = (int)db()->query('SELECT COUNT(*) FROM users WHERE is_admin = 1')->fetchColumn();
if ($count > 0) json_error('An admin already exists', 403);

$stmt = db()->prepare('UPDATE users SET is_admin = 1 WHERE id = ?');
$stmt->execute([(int)$user['id']]);

json_response(['ok' => true]);
