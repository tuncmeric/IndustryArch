# IndustryArch — cPanel deployment

A static React SPA + PHP/MySQL admin CMS, built to run on shared cPanel hosting.

- **Frontend:** Vite + React 18 + React Router + Tailwind v3 (built to static files)
- **Backend:** plain PHP 8 endpoints under `/api/*`
- **Database:** MySQL via cPanel phpMyAdmin
- **Auth:** JWT in HttpOnly cookie, bcrypt password hashes

## Folder layout

```
industry-arch-cpanel/
├── src/                      # React source
├── public/                   # Static assets bundled into the build
├── api/                      # PHP backend (uploaded as-is to public_html/api)
│   ├── _lib/                 # Bootstrap, DB, JWT, upload helpers (denied from web)
│   ├── auth/                 # login, signup, logout, me, claim-admin
│   ├── content/              # list, save  (site_content table)
│   ├── projects/             # list, save, create, delete, upload
│   ├── settings/             # list, save, upload
│   ├── contact/              # send  (public)
│   ├── config.example.php    # COPY → config.php and fill in
│   └── .htaccess             # Denies access to _lib/ and config.php
├── database/
│   └── schema.sql            # Import in phpMyAdmin
├── uploads/                  # Created at runtime by admin uploads
├── .htaccess                 # Root rewrite rules + security headers
├── index.html                # SPA shell
├── package.json
└── vite.config.ts
```

---

## 1. Local development (optional)

You only need this if you want to preview/edit the site before deploying.

```bash
npm install
npm run dev          # http://localhost:5173
```

In dev mode the Vite proxy forwards `/api/*` and `/uploads/*` to `http://localhost:8000`.
If you want to test the PHP backend locally, run:

```bash
cd api
php -S localhost:8000
```

(You'll also need a local MySQL instance and a copy of `api/config.php`.)

For a frontend-only preview without the backend, the static `i18n-static.ts` translations
mean every page renders correctly with no API calls; only the `/auth` and `/admin` routes
need a working backend.

---

## 2. Production build

```bash
npm install
npm run build        # outputs to dist/
```

`dist/` contains: `index.html`, hashed JS/CSS bundles, and the contents of `public/` (images, etc.)

---

## 3. cPanel deployment — step by step

### 3a. Create the MySQL database

1. cPanel → **MySQL Database Wizard**
2. Database name → e.g. `youruser_industryarch`
3. Create a user (e.g. `youruser_iadmin`) with a strong password — **save these credentials**
4. Grant **All Privileges** to that user on the database

### 3b. Import the schema

1. cPanel → **phpMyAdmin** → select the database you just created
2. Click **Import** → choose `database/schema.sql` from your local checkout → **Go**
3. Verify the four tables exist: `users`, `site_content`, `site_projects`, `site_settings`, `contact_messages`

### 3c. Generate a JWT secret

On any machine with PHP:

```bash
php -r "echo bin2hex(random_bytes(32));"
```

Save the output — you'll paste it into `config.php` next.

### 3d. Build & upload the app

On your local machine:

```bash
npm install
npm run build
```

Upload the **contents** of these to your cPanel `public_html`:

| Source                          | cPanel destination     |
| ------------------------------- | ---------------------- |
| `dist/` (everything inside)     | `public_html/`         |
| `api/` (whole folder)           | `public_html/api/`     |
| `database/` (only for reference)| (don't upload)         |
| `.htaccess`                     | `public_html/.htaccess`|
| `uploads/.htaccess`             | `public_html/uploads/.htaccess` |

The easy way: zip them locally as one bundle and use cPanel **File Manager → Extract**.

Resulting structure on the server:

```
public_html/
├── index.html
├── assets/                ← hashed JS/CSS
├── images/                ← project photos
├── favicon.svg
├── .htaccess
├── api/
│   ├── _lib/
│   ├── auth/  content/  projects/  settings/  contact/
│   ├── .htaccess
│   └── config.example.php
└── uploads/               ← writable, .htaccess in place
```

### 3e. Create `api/config.php`

In cPanel **File Manager**, navigate to `public_html/api/`:

1. Right-click `config.example.php` → **Copy** → name it `config.php`
2. Edit `config.php`, fill in:
   ```php
   'db' => [
       'host'     => 'localhost',
       'name'     => 'youruser_industryarch',  // from step 3a
       'user'     => 'youruser_iadmin',
       'password' => '...',
       'charset'  => 'utf8mb4',
   ],
   'jwt_secret' => '...',  // from step 3c
   'cookie_secure' => true,            // false only if testing without HTTPS
   'contact_to' => 'info@industryarch.com',
   ```

### 3f. Make uploads writable

cPanel File Manager → right-click `public_html/uploads` → **Change Permissions** → **755** (the PHP user is the same as the file owner on cPanel, so 755 is enough).

### 3g. SSL / HTTPS

Most cPanel hosts auto-provision Let's Encrypt:
- cPanel → **SSL/TLS Status** → **Run AutoSSL** for your domain.
- Once HTTPS is active, uncomment the "Force HTTPS" block in `.htaccess`.

### 3h. Claim the admin account

1. Browse to `https://yourdomain.com/auth`
2. Click **Sign up** → create an account with your email + password (8+ chars)
3. You'll land on `/admin` showing **Access Restricted** with a **Claim Admin Access** button
   (this only appears for the very first user, while no admin exists yet)
4. Click it → reload → you have full admin
5. **Delete the public signup endpoint** (or leave it — only the *first* signup can ever become admin):
   - To be extra safe: edit `public_html/api/auth/signup.php` and add `json_error('Disabled', 403);` near the top, or simply delete the file. Existing users can still log in via `/api/auth/login.php`.

---

## 4. Updating the site

To deploy a code change:

```bash
npm run build
```

Re-upload the **contents of `dist/`** to `public_html/`, replacing the previous build.
The `assets/*` files have content hashes so visitors get the new version immediately;
the SPA shell (`index.html`) is configured `no-cache` in `.htaccess`.

The `api/` folder, `config.php`, and `uploads/` are not touched by a frontend redeploy —
only re-upload `api/` if you've changed PHP code.

---

## 5. Editing content via admin panel

1. Sign in at `/auth`
2. Go to `/admin`
3. Three tabs:
   - **Page Content** — edit any translation key in EN/PL/TR. Changes go live without a rebuild.
   - **Projects** — add/edit/delete portfolio entries with images
   - **Contact & Images** — phone, email, hero image, etc.

Pages render translations from the database first, falling back to the static defaults baked
into the JS bundle for any key not yet in the database. So an empty database just shows the
static defaults — the admin panel is purely additive.

---

## 6. Security notes

- Passwords are stored as `password_hash(..., PASSWORD_DEFAULT)` (bcrypt as of PHP 8).
- The session cookie is HttpOnly + Secure (when `cookie_secure: true`) + SameSite=Lax.
- All admin endpoints call `require_admin()` which validates the JWT and checks `is_admin = 1`.
- Image uploads are MIME-type validated against an allowlist (jpeg/png/webp/gif), capped at 8 MB,
  and stored under `uploads/` with the executable extensions blocked by `uploads/.htaccess`.
- `api/_lib/` and `api/config.php` are blocked from the web by `api/.htaccess`.
- The frontend code is bundled — Supabase keys and any other secret would have leaked into the
  browser bundle. We avoid this by keeping all secrets in `api/config.php` server-side.

---

## 7. Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `Server not configured (config.php missing)` on every API call | You forgot step 3e (copy `config.example.php` → `config.php`). |
| 500 error on first API call | Check cPanel **Error Log**. Most likely: wrong DB credentials in `config.php`, or PHP version <8.0. |
| Login works but admin actions return 401/403 | Browser is blocking the cookie because `cookie_secure: true` but you're on plain http. Set `cookie_secure: false` until SSL is active. |
| Refreshing `/about` returns 404 | `.htaccess` not uploaded, or `mod_rewrite` not enabled. Most cPanel hosts have it on by default. |
| Image upload returns "File too large" | Either >8 MB (raise `MAX_UPLOAD_BYTES` in `api/_lib/upload.php`) or PHP `upload_max_filesize`/`post_max_size` is below 8 MB (cPanel → MultiPHP INI Editor). |
