<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');
require_admin();

$body = read_json_body();
$id = (int)($body['id'] ?? 0);
$value = (string)($body['value'] ?? '');
if ($id <= 0) json_error('Invalid id');

$stmt = db()->prepare('UPDATE site_settings SET setting_value = ?, updated_at = NOW() WHERE id = ?');
$stmt->execute([$value, $id]);

json_response(['ok' => true]);
