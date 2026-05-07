<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');
require_admin();

$body = read_json_body();
$id = (int)($body['id'] ?? 0);
if ($id <= 0) json_error('Invalid id');

$stmt = db()->prepare('DELETE FROM site_projects WHERE id = ?');
$stmt->execute([$id]);

json_response(['ok' => true]);
