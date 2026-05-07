<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');
require_admin();

$body = read_json_body();
$slug = trim((string)($body['slug'] ?? ''));
if (!preg_match('/^[a-z0-9-]+$/', $slug)) json_error('Invalid slug');

$exists = db()->prepare('SELECT id FROM site_projects WHERE slug = ?');
$exists->execute([$slug]);
if ($exists->fetch()) json_error('Slug already exists', 409);

$max = (int)db()->query('SELECT COALESCE(MAX(sort_order), 0) FROM site_projects')->fetchColumn();

$ins = db()->prepare(
    'INSERT INTO site_projects (slug, category, title_en, sort_order)
     VALUES (?, "commercial", "New Project", ?)'
);
$ins->execute([$slug, $max + 1]);
$id = (int)db()->lastInsertId();

$row = db()->prepare(
    'SELECT id, slug, category, title_en, title_pl, title_tr,
            description_en, description_pl, description_tr,
            location, scope, role, outcome, image_url,
            is_restricted, is_published, sort_order
     FROM site_projects WHERE id = ?'
);
$row->execute([$id]);
$r = $row->fetch();
$r['id']            = (int)$r['id'];
$r['is_restricted'] = (bool)$r['is_restricted'];
$r['is_published']  = (bool)$r['is_published'];
$r['sort_order']    = (int)$r['sort_order'];

json_response($r);
