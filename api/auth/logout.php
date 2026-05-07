<?php
require_once __DIR__ . '/../_lib/bootstrap.php';
require_method('POST');

clear_session_cookie();
json_response(['ok' => true]);
