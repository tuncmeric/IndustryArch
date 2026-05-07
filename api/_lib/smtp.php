<?php
declare(strict_types=1);

// Minimal SMTP client with STARTTLS + AUTH LOGIN (port 587).
// Plain-text UTF-8 bodies. Subject is RFC 2047 encoded so non-ASCII is preserved.

class SmtpException extends RuntimeException {}

function smtp_send(array $cfg, string $to, string $subject, string $body, string $replyTo = ''): void {
    $host     = (string)($cfg['host']      ?? '');
    $port     = (int)   ($cfg['port']      ?? 587);
    $user     = (string)($cfg['user']      ?? '');
    $pass     = (string)($cfg['pass']      ?? '');
    $from     = (string)($cfg['from']      ?? $user);
    $fromName = (string)($cfg['from_name'] ?? '');
    $timeout  = 12;

    if ($host === '' || $user === '' || $pass === '') {
        throw new SmtpException('SMTP not configured (host/user/pass missing in config.php)');
    }

    $sock = @stream_socket_client("tcp://$host:$port", $errno, $errstr, $timeout);
    if (!$sock) throw new SmtpException("SMTP connect failed: $errstr ($errno)");
    stream_set_timeout($sock, $timeout);

    $read = static function ($sock, int $expected): string {
        $resp = '';
        while (!feof($sock)) {
            $line = fgets($sock, 4096);
            if ($line === false) throw new SmtpException('SMTP read failed');
            $resp .= $line;
            if (preg_match('/^\d{3} /', $line)) break; // multi-line replies end with "NNN " (space, not "-")
        }
        if ((int)substr($resp, 0, 3) !== $expected) {
            throw new SmtpException("SMTP expected $expected, got: " . trim($resp));
        }
        return $resp;
    };
    $write = static function ($sock, string $cmd): void {
        if (fwrite($sock, $cmd . "\r\n") === false) throw new SmtpException('SMTP write failed');
    };

    $helo = ($_SERVER['HTTP_HOST'] ?? 'localhost');

    try {
        $read($sock, 220);

        $write($sock, "EHLO $helo");      $read($sock, 250);
        $write($sock, 'STARTTLS');         $read($sock, 220);

        if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new SmtpException('TLS upgrade failed');
        }

        $write($sock, "EHLO $helo");                   $read($sock, 250);
        $write($sock, 'AUTH LOGIN');                    $read($sock, 334);
        $write($sock, base64_encode($user));            $read($sock, 334);
        $write($sock, base64_encode($pass));            $read($sock, 235);

        $write($sock, "MAIL FROM:<$from>");              $read($sock, 250);
        $write($sock, "RCPT TO:<$to>");                  $read($sock, 250);
        $write($sock, 'DATA');                           $read($sock, 354);

        $subjEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $headers = [];
        if ($fromName !== '') {
            $headers[] = 'From: =?UTF-8?B?' . base64_encode($fromName) . "?= <$from>";
        } else {
            $headers[] = "From: <$from>";
        }
        $headers[] = "To: <$to>";
        $headers[] = "Subject: $subjEnc";
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: 8bit';
        if ($replyTo !== '') $headers[] = "Reply-To: <$replyTo>";
        $headers[] = 'Date: ' . date('r');
        $headers[] = 'Message-ID: <' . bin2hex(random_bytes(12)) . "@$helo>";

        // Normalize newlines to CRLF and dot-stuff lines starting with "."
        $bodyCrlf = preg_replace('/\r?\n/', "\r\n", $body) ?? $body;
        $bodyStuffed = preg_replace('/^\./m', '..', $bodyCrlf) ?? $bodyCrlf;

        $write($sock, implode("\r\n", $headers) . "\r\n\r\n" . $bodyStuffed . "\r\n.");
        $read($sock, 250);

        $write($sock, 'QUIT');
        // Server closes; ignore reply.
    } finally {
        @fclose($sock);
    }
}
