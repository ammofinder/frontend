<?php
require 'config.php';

$typ = $_GET['caliber'] ?? '';
$sql = "SELECT caliber, shop, link, product_name, price, date_updated FROM produkty WHERE caliber = ?";
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
