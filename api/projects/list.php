<?php
require_once __DIR__ . '/../_lib/bootstrap.php';

$rows = db()->query(
    'SELECT id, slug, category, title_en, title_pl, title_tr,
            description_en, description_pl, description_tr,
            location, scope, role, outcome, image_url,
            is_restricted, is_published, sort_order
     FROM site_projects
     ORDER BY sort_order, id'
)->fetchAll();

foreach ($rows as &$r) {
    $r['id']            = (int)$r['id'];
    $r['is_restricted'] = (bool)$r['is_restricted'];
    $r['is_published']  = (bool)$r['is_published'];
    $r['sort_order']    = (int)$r['sort_order'];
}

json_response($rows);
