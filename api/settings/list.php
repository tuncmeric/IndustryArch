<?php
require_once __DIR__ . '/../_lib/bootstrap.php';

$rows = db()->query(
    'SELECT id, setting_key, setting_value, label, setting_type, sort_order
     FROM site_settings
     ORDER BY sort_order, id'
)->fetchAll();

foreach ($rows as &$r) {
    $r['id']         = (int)$r['id'];
    $r['sort_order'] = (int)$r['sort_order'];
}

json_response($rows);
