<?php
declare(strict_types=1);

const AUTH_COOKIE_NAME = 'ia_session';
const AUTH_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function jwt_secret(): string {
    global $CONFIG;
    $secret = $CONFIG['jwt_secret'] ?? '';
    if (strlen($secret) < 32) {
        json_error('Server misconfigured (jwt_secret)', 500);
    }
    return $secret;
}

function b64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function b64url_decode(string $data): string {
    $pad = strlen($data) % 4;
    if ($pad) $data .= str_repeat('=', 4 - $pad);
    return base64_decode(strtr($data, '-_', '+/')) ?: '';
}

function jwt_sign(array $payload): string {
    $header = ['alg' => 'HS256', 'typ' => 'JWT'];
    $h = b64url_encode(json_encode($header));
    $p = b64url_encode(json_encode($payload));
    $sig = b64url_encode(hash_hmac('sha256', "$h.$p", jwt_secret(), true));
    return "$h.$p.$sig";
}

function jwt_verify(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $sig] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', "$h.$p", jwt_secret(), true));
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(b64url_decode($p), true);
    if (!is_array($payload)) return null;
    if (isset($payload['exp']) && time() > (int)$payload['exp']) return null;
    return $payload;
}

function set_session_cookie(int $userId): void {
    global $CONFIG;
    $token = jwt_sign([
        'uid' => $userId,
        'iat' => time(),
        'exp' => time() + AUTH_TTL_SECONDS,
    ]);
    setcookie(AUTH_COOKIE_NAME, $token, [
        'expires'  => time() + AUTH_TTL_SECONDS,
        'path'     => '/',
        'domain'   => $CONFIG['cookie_domain'] ?? '',
        'secure'   => (bool)($CONFIG['cookie_secure'] ?? true),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function clear_session_cookie(): void {
    global $CONFIG;
    setcookie(AUTH_COOKIE_NAME, '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'domain'   => $CONFIG['cookie_domain'] ?? '',
        'secure'   => (bool)($CONFIG['cookie_secure'] ?? true),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

/** Returns user row or null. */
function current_user(): ?array {
    $token = $_COOKIE[AUTH_COOKIE_NAME] ?? '';
    if (!$token) return null;
    $payload = jwt_verify($token);
    if (!$payload || empty($payload['uid'])) return null;
    $stmt = db()->prepare('SELECT id, email, is_admin FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([(int)$payload['uid']]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function require_auth(): array {
    $user = current_user();
    if (!$user) json_error('Not authenticated', 401);
    return $user;
}

function require_admin(): array {
    $user = require_auth();
    if (empty($user['is_admin'])) json_error('Admin only', 403);
    return $user;
}
