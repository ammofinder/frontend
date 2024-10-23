# amunicja_pomorskie_frontend

Tldr: istnieje dobroni.org ale ukierunkowany na sklepy z południa kraju, więc na szybko machnąłem po swojemu, 
żeby scrapować interesujące mnie pomorskie sklepy.

Możliwe, że stronka będzie online w niedługim czasie.

# To connect with database

Create `config.php` file in `static` folder with following content:

```php
<?php
$host = "server address";
$user = "username";
$password = "password";
$dbname = "database name";
$port = port;

$mysqli = new mysqli($host, $user, $password, $dbname, $port);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>
```

# Early preview

![preview](https://i.ibb.co/9stPL5t/Przechwytywanie.png)


# More info
Database should contain data scrapped from webpages. More info here: 
https://github.com/wkobiela/dobroni_pomorskie_backend
