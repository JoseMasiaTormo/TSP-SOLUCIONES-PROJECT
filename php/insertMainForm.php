<?php  
$mysqli = new mysqli("localhost", "root", "sa", "tsp-soluciones");
if($mysqli->connect_error) {
    exit("Could not connect");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $pais = $_POST["pais"];
    $ciudad = $_POST["ciudad"];
    $was = $_POST["was"];
    $correo = $_POST["correo"];
    $info = $_POST["info"];

    if (!empty($nombre) && !empty($apellido) && !empty($was) && !empty($correo)) {
        $sql = $mysqli->prepare("INSERT INTO form_cc (nombre, apellido, pais, ciudad, was, correo, info) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $sql->bind_param("ssssdss", $nombre, $apellido, $pais, $ciudad, $was, $correo, $info);
        $sql->execute();
        echo "Formulario enviado correctamente";
        $mysqli->close();
    } else {
        echo "Por favor completa todos los campos";
    }
} else {
    echo "Error en la solicitud.";
}
?>