<?php
// Loaded by every endpoint. Initializes config, DB, error handling, and JSON response helpers.

declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

set_exception_handler(function (Throwable $e): void {
    http_response_code(500);
    error_log('[api] ' . $e->getMessage() . "\n" . $e->getTraceAsString());
    echo json_encode(['error' => 'Server error']);
    exit;
});

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Server not configured (config.php missing)']);
    exit;
}
$CONFIG = require $configPath;

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/response.php';
