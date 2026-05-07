-- IndustryArch — cPanel deployment schema
-- Import this in cPanel → phpMyAdmin (after creating the database via MySQL Database Wizard).
-- Charset: utf8mb4 to support Polish, Turkish, and emoji.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------
-- Users + admin role
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255)  NOT NULL UNIQUE,
    password_hash   VARCHAR(255)  NOT NULL,
    is_admin        TINYINT(1)    NOT NULL DEFAULT 0,
    created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- Site content (multi-lingual page text — overrides static defaults)
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_content (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content_key  VARCHAR(120) NOT NULL UNIQUE,
    section      VARCHAR(60)  NOT NULL DEFAULT 'general',
    value_en     TEXT         NOT NULL,
    value_pl     TEXT         NOT NULL,
    value_tr     TEXT         NOT NULL,
    is_long      TINYINT(1)   NOT NULL DEFAULT 0,
    sort_order   INT          NOT NULL DEFAULT 0,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_section (section, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- Site projects (portfolio entries)
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_projects (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    category        VARCHAR(40)  NOT NULL DEFAULT 'commercial',
    title_en        VARCHAR(200) NOT NULL DEFAULT '',
    title_pl        VARCHAR(200) NOT NULL DEFAULT '',
    title_tr        VARCHAR(200) NOT NULL DEFAULT '',
    description_en  TEXT         NOT NULL,
    description_pl  TEXT         NOT NULL,
    description_tr  TEXT         NOT NULL,
    location        VARCHAR(200) NULL,
    scope           VARCHAR(200) NULL,
    role            VARCHAR(120) NULL,
    outcome         VARCHAR(400) NULL,
    image_url       VARCHAR(400) NULL,
    is_restricted   TINYINT(1)   NOT NULL DEFAULT 0,
    is_published    TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order      INT          NOT NULL DEFAULT 0,
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category, sort_order),
    INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- Site settings (contact info, hero image, misc config)
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key   VARCHAR(80)  NOT NULL UNIQUE,
    setting_value TEXT         NOT NULL,
    label         VARCHAR(120) NULL,
    setting_type  VARCHAR(20)  NOT NULL DEFAULT 'text',
    sort_order    INT          NOT NULL DEFAULT 0,
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- Contact form submissions (so leads aren't lost if mail() fails)
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(255)  NOT NULL,
    phone       VARCHAR(40)   NOT NULL DEFAULT '',
    message     TEXT          NOT NULL,
    ip          VARCHAR(45)   NOT NULL DEFAULT '',
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------
-- Initial settings (admin can edit values via admin panel)
-- ----------------------------------------------------------------------
INSERT IGNORE INTO site_settings (setting_key, setting_value, label, setting_type, sort_order) VALUES
    ('contact_address',  'ul. Wieniecka 6, 03-634 Warszawa', 'Office address',     'text',  10),
    ('contact_phone',    '+48 576 10 70 71',                 'Phone',              'text',  20),
    ('contact_email',    'info@industryarch.com',            'Public email',       'text',  30),
    ('hero_image',       '/images/turkish-embassy.jpg',      'Homepage hero image','image', 40);

-- Note on content seeding:
-- The React app ships with a complete `i18n-static.ts` fallback covering every translation key.
-- The `site_content` table is empty by default — admin edits insert/update rows that override
-- the static defaults. This means the site renders correctly with an empty database; you only
-- populate site_content when you want to change text without rebuilding the frontend.
