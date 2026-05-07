<?php
declare(strict_types=1);

const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_IMAGE_EXT  = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const MAX_UPLOAD_BYTES   = 8 * 1024 * 1024; // 8 MB

/**
 * Move a single uploaded file into a subdirectory and return the public URL.
 * The filename is derived from $prefix + a random hex string + the original extension.
 */
function save_uploaded_image(array $file, string $subdir, string $prefix): string {
    global $CONFIG;

    if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) json_error('Upload failed');
    if ($file['size'] > MAX_UPLOAD_BYTES) json_error('File too large (max 8 MB)');

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!in_array($mime, ALLOWED_IMAGE_MIME, true)) json_error('Unsupported image type');

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ALLOWED_IMAGE_EXT, true)) $ext = 'jpg';
    if ($ext === 'jpeg') $ext = 'jpg';

    $dir = rtrim($CONFIG['upload_dir'], '/') . '/' . trim($subdir, '/');
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        json_error('Could not create upload directory', 500);
    }

    $name = preg_replace('/[^a-z0-9-]/', '', strtolower($prefix)) . '-' . bin2hex(random_bytes(6)) . '.' . $ext;
    $dest = $dir . '/' . $name;
    if (!move_uploaded_file($file['tmp_name'], $dest)) json_error('Could not save file', 500);

    return rtrim($CONFIG['upload_url'], '/') . '/' . trim($subdir, '/') . '/' . $name;
}
