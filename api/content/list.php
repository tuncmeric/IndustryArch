<?php
require_once __DIR__ . '/../_lib/bootstrap.php';

$rows = db()->query(
    'SELECT id, content_key, section, value_en, value_pl, value_tr, is_long, sort_order
     FROM site_content
     ORDER BY section, sort_order, id'
)->fetchAll();

// Cast types for JSON.
foreach ($rows as &$r) {
    $r['id']         = (int)$r['id'];
    $r['is_long']    = (bool)$r['is_long'];
    $r['sort_order'] = (int)$r['sort_order'];
}

json_response($rows);
