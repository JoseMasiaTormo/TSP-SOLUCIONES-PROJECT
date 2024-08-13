<?php
$mysqli = new mysqli("localhost", "root", "sa", "tsp-soluciones");

if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

$query = "SELECT * FROM user_form_libro";
$resultado = $mysqli->query($query);

if (!$resultado) {
    die("Error en la consulta: " . $mysqli->error);
}

$datos = array();

while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila;
}

$resultado->free();
$mysqli->close();

$csv = implode(",", array_keys($datos[0])) . "\n";
foreach ($datos as $fila) {
    $csv .= implode(",", $fila) . "\n";
}

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename=user_form_libro.csv');
echo $csv;
?>
