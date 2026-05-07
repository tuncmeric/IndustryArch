<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_once __DIR__ . '/../_lib/upload.php';
require_method('POST');
require_admin();

$id = (int)($_POST['id'] ?? 0);
if ($id <= 0) json_error('Invalid id');

$file = $_FILES['file'] ?? null;
if (!$file) json_error('No file uploaded');

$rowStmt = db()->prepare('SELECT setting_key FROM site_settings WHERE id = ?');
$rowStmt->execute([$id]);
$row = $rowStmt->fetch();
if (!$row) json_error('Setting not found', 404);

$url = save_uploaded_image($file, 'settings', $row['setting_key']);

$upd = db()->prepare('UPDATE site_settings SET setting_value = ?, updated_at = NOW() WHERE id = ?');
$upd->execute([$url, $id]);

json_response(['setting_value' => $url]);
