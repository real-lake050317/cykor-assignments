<?php
session_start();
$host = 'localhost';
$db = 'exampledb';
$user = 'exampleuser';
$password = '1234';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


function is_logged_in(): bool
{
    return isset($_SESSION['username']);
}

function is_admin(): bool
{
    return isset($_SESSION['username']) && $_SESSION['username'] === 'admin';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'register':
            $username = trim($_POST['username'] ?? '');
            $password = $_POST['password'] ?? '';
            if ($username && $password) {
                $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
                $stmt->execute([$username]);
                if (!$stmt->fetch()) {
                    $hash = password_hash($password, PASSWORD_DEFAULT);
                    $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
                        ->execute([$username, $hash]);
                }
            }
            header('Location: /');
            exit;

        case 'login':
            $username = trim($_POST['username'] ?? '');
            $password = $_POST['password'] ?? '';
            $stmt = $pdo->prepare('SELECT id, password_hash, is_admin FROM users WHERE username = ?');
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $username;
                $_SESSION['is_admin'] = $user['is_admin'];
            }
            header('Location: /');
            exit;

        case 'logout':
            session_unset();
            session_destroy();
            header('Location: /');
            exit;

        case 'create_post':
            if (!is_logged_in()) {
                header('Location: /');
                exit;
            }
            $title   = trim($_POST['title'] ?? '');
            $content = trim($_POST['content'] ?? '');
            $only_me = isset($_POST['only_me']) ? 1 : 0;
            if ($title && $content) {
                $pdo->prepare('INSERT INTO posts (user_id, title, content, only_me) VALUES (?, ?, ?, ?)')
                    ->execute([$_SESSION['user_id'], $title, $content, $only_me]);
            }
            header('Location: /');
            exit;
    }
}

if (is_admin()) {
    $stmt = $pdo->query('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC');
} elseif (is_logged_in()) {
    $stmt = $pdo->prepare('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.only_me = 0 OR p.user_id = ? ORDER BY p.created_at DESC');
    $stmt->execute([$_SESSION['user_id']]);
} else {
    $stmt = $pdo->query(query: 'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.only_me = 0 ORDER BY p.created_at DESC');
}
$posts = $stmt->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Blog</title>
</head>

<body>
    <?php if (!is_logged_in()): ?>
        <h2>Register</h2>
        <form method="post">
            <input type="hidden" name="action" value="register">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <h2>Login</h2>
        <form method="post">
            <input type="hidden" name="action" value="login">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>

    <?php else: ?>
        <h2>Upload Post</h2>
        <form method="post">
            <input type="hidden" name="action" value="create_post">
            <input style="width:100%;" type="text" name="title" placeholder="Title" required><br>
            <textarea style="width:100%;height:120px;" name="content" placeholder="Content" required></textarea><br>
            <label><input type="checkbox" name="only_me"> Only me</label><br>
            <button type="submit">Upload</button>
        </form>
        <h2>Logout</h2>
        <form method="post">
            <input type="hidden" name="action" value="logout">
            <button type="submit">Logout</button>
        </form>
    <?php endif; ?>
</body>