<?php
// Copy this file to config.php and fill in your values.
// config.php is gitignored.

return [
    // MySQL database (created via cPanel "MySQL Database Wizard")
    'db' => [
        'host'     => 'localhost',
        'name'     => 'youruser_industryarch',
        'user'     => 'youruser_iadmin',
        'password' => 'CHANGE_ME',
        'charset'  => 'utf8mb4',
    ],

    // JWT signing secret. Generate with:  php -r "echo bin2hex(random_bytes(32));"
    'jwt_secret' => 'CHANGE_ME_TO_A_64_CHAR_HEX_STRING',

    // Cookie domain. Leave empty for default (current domain).
    // Set to '.yourdomain.com' to share across subdomains.
    'cookie_domain' => '',

    // Set true on the live HTTPS site. Locally over plain http set false.
    'cookie_secure' => true,

    // Filesystem path where uploaded images are stored (server-side).
    // Should resolve to public_html/uploads on cPanel.
    'upload_dir' => __DIR__ . '/../uploads',

    // Public URL prefix for uploaded files (browser-side).
    'upload_url' => '/uploads',

    // Email recipient for the contact form.
    'contact_to' => 'info@industryarch.com',

    // SMTP credentials for outgoing email (contact form).
    // For Google Workspace:
    //   1. Enable 2-Step Verification at https://myaccount.google.com/security
    //   2. Generate an App Password at https://myaccount.google.com/apppasswords
    //      (App: "Mail", Device: "IndustryArch website")
    //   3. Paste the 16-character app password as "pass" below — NOT your regular password
    'smtp' => [
        'host'      => 'smtp.gmail.com',
        'port'      => 587,
        'user'      => 'info@industryarch.com',
        'pass'      => 'CHANGE_ME_TO_GOOGLE_APP_PASSWORD',
        'from'      => 'info@industryarch.com',
        'from_name' => 'IndustryArch Website',
    ],
];
