<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');
require_admin();

$body = read_json_body();
$id = (int)($body['id'] ?? 0);
$patch = $body['patch'] ?? null;

if ($id <= 0 || !is_array($patch)) json_error('Invalid request');

$allowed = ['value_en', 'value_pl', 'value_tr', 'is_long'];
$set = [];
$args = [];
foreach ($allowed as $col) {
    if (array_key_exists($col, $patch)) {
        $set[] = "$col = ?";
        $args[] = $col === 'is_long' ? (int)(bool)$patch[$col] : (string)$patch[$col];
    }
}
if (!$set) json_error('Nothing to update');
$args[] = $id;

$sql = 'UPDATE site_content SET ' . implode(', ', $set) . ', updated_at = NOW() WHERE id = ?';
db()->prepare($sql)->execute($args);

json_response(['ok' => true]);
