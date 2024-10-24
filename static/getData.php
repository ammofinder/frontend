<?php
require 'config.php';

$typ = $_GET['caliber'] ?? '';
$dateFilter = isset($_GET['dateFilter']) ? $_GET['dateFilter'] === 'true' : false;

// SQL query for products no older than 1 day, else ALL products
if ($dateFilter) {
    $sql = "SELECT caliber, shop, link, product_name, price, available, date_updated 
            FROM produkty 
            WHERE caliber = ? 
            AND date_updated >= NOW() - INTERVAL 1 DAY";
} else {
    $sql = "SELECT caliber, shop, link, product_name, price, available, date_updated 
            FROM produkty 
            WHERE caliber = ?";
}

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $typ);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>