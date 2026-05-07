<?php
require_once __DIR__ . '/../_lib/bootstrap.php';

$user = current_user();
$count = (int)db()->query('SELECT COUNT(*) FROM users WHERE is_admin = 1')->fetchColumn();

json_response([
    'user' => $user ? [
        'id'       => (int)$user['id'],
        'email'    => $user['email'],
        'is_admin' => (bool)$user['is_admin'],
    ] : null,
    'admin_count' => $count,
]);
