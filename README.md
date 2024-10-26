# amunicja_pomorskie_frontend

Tldr: there is dobroni.org but it is aimed at stores from the south of the country, so I quickly made my own
to scrapbook the Pomeranian stores that interest me.

It is possible that the site will be online soon.

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

![preview](https://i.ibb.co/phS4pzd/Przechwytywanie.png)


# More info
Database should contain data scrapped from webpages. More info here: 
https://github.com/wkobiela/dobroni_pomorskie_backend
