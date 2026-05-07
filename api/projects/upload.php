<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_once __DIR__ . '/../_lib/upload.php';
require_method('POST');
require_admin();

$id = (int)($_POST['id'] ?? 0);
if ($id <= 0) json_error('Invalid id');

$file = $_FILES['file'] ?? null;
if (!$file) json_error('No file uploaded');

$rowStmt = db()->prepare('SELECT slug FROM site_projects WHERE id = ?');
$rowStmt->execute([$id]);
$row = $rowStmt->fetch();
if (!$row) json_error('Project not found', 404);

$url = save_uploaded_image($file, 'projects', $row['slug']);

$upd = db()->prepare('UPDATE site_projects SET image_url = ?, updated_at = NOW() WHERE id = ?');
$upd->execute([$url, $id]);

json_response(['image_url' => $url]);
