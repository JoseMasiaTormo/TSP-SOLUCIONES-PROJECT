<?php
$mysqli = new mysqli("localhost", "root", "sa", "tsp-soluciones");
if($mysqli->connect_error) {
  exit('Could not connect');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $instaBook = $_POST["instaBook"];
    $linkBook = $_POST["linkBook"];

    if (!empty($correo) && !empty($nombre)) {
        $sql = $mysqli->prepare("INSERT INTO user_form_libro (nombre, correo, instaBook, linkBook) VALUES (?, ?, ?, ?)");
        $sql->bind_param("ssss", $nombre, $correo, $instaBook, $linkBook);
        $sql->execute();
        echo "Formulario enviado correctamente";
        $mysqli->close();
    } else {
        echo "Por favor, completa todos los campos.";
    }
} else {
    echo "Error en la solicitud.";
}
?>
