<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');
require_admin();

$body = read_json_body();
$id = (int)($body['id'] ?? 0);
$patch = $body['patch'] ?? null;
if ($id <= 0 || !is_array($patch)) json_error('Invalid request');

$allowed = [
    'category', 'title_en', 'title_pl', 'title_tr',
    'description_en', 'description_pl', 'description_tr',
    'location', 'scope', 'role', 'outcome', 'image_url',
    'is_restricted', 'is_published', 'sort_order',
];
$boolCols = ['is_restricted', 'is_published'];
$intCols  = ['sort_order'];

$set = [];
$args = [];
foreach ($allowed as $col) {
    if (!array_key_exists($col, $patch)) continue;
    $set[] = "$col = ?";
    $v = $patch[$col];
    if (in_array($col, $boolCols, true)) $args[] = (int)(bool)$v;
    elseif (in_array($col, $intCols, true)) $args[] = (int)$v;
    else $args[] = $v === null ? null : (string)$v;
}
if (!$set) json_error('Nothing to update');
$args[] = $id;

$sql = 'UPDATE site_projects SET ' . implode(', ', $set) . ', updated_at = NOW() WHERE id = ?';
db()->prepare($sql)->execute($args);

json_response(['ok' => true]);
