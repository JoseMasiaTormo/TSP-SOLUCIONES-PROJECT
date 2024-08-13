var READY_STATE_COMPLETE = 4;
var xhr = null;

window.onload = function() {
    document.getElementById("formTalCheckbox").reset();
    document.getElementById("btn-submit").onclick = function(event) {
        validName(event);
    };
    removeLabel();
    document.getElementById("tooltip").addEventListener("mouseover", toolTip);
    document.getElementById("tooltip").addEventListener("mouseout", toolTip);
    document.getElementById('descargarCSV').onclick = function() {
        descargarCSV();
    }
}   

//Insertar datos a la base de datos (Primer formulario) /AJAX Puro/
function valida() {
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var nombre = document.getElementById("nombre");
    var correo = document.getElementById("correo");
    var instaEb = document.getElementById("ch1");
    var instaEbValue;
    var linkedEb = document.getElementById("ch2");
    var linkedEbValue;

    if (instaEb.checked) {
        instaEbValue = "yes";
    } else {
        instaEbValue = "no";
    }

    if (linkedEb.checked) {
        linkedEbValue = "yes";
    } else {
        linkedEbValue = "no";
    }

    var query = "nombre=" + encodeURIComponent(nombre.value) +
        "&correo=" + encodeURIComponent(correo.value) +
        "&instaBook=" + encodeURIComponent(instaEbValue) + 
        "&linkBook=" + encodeURIComponent(linkedEbValue);

    if (xhr) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == READY_STATE_COMPLETE) {
                if (xhr.status == 200) {
                    var conds = document.getElementById("ch3");
                    console.log(xhr.responseText);
                    var mensaje = xhr.responseText;
                    document.getElementById("respuesta").innerHTML = mensaje;
                } else {
                  console.error("Error en la petición. Estado: ", xhr.status);
                }
            }
        }
        xhr.open("POST", "php/insert.php", true);
        console.log("Parametros: ", query);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log("Enviando petición...");
        xhr.send(query);
    }
}

//Mostrar Gif de cargando /JQuery/
function mostrarGif() {
    $('#miGif').css("display", "block");  
    setTimeout(function() {
        $('#miGif').css("display", "none");
    }, 1000);
}

//Mostrar mensajes de error en el html /JQuery/
function displayMessage(message) {
    $("#message").append("<p>" + message + "</p>");
}

// Validar nombre, correo y casilla de condiciones (Primer formulario) /JavaScript/ 
function validName(event) {
    var errorMessageContainer = document.getElementById("message");
    var respuesta = document.getElementById("respuesta");
    errorMessageContainer.innerHTML = "";
    respuesta.innerHTML = "";

    mostrarGif();

    setTimeout(function() {
        var valor = document.getElementById("nombre").value;
        var valorCorreo = document.getElementById("correo").value;
        var conds = document.getElementById("ch3");
        var todoOk = true;

        if (valor == null || valor.length == 0 || /^\s+$/.test(valor)) {
            todoOk = false;
            console.log("El nombre es obligatorio");
            displayMessage("El nombre es obligatorio");
        }

        if (valorCorreo == null || valorCorreo.length == 0 || /^\s+$/.test(valorCorreo)) {
            todoOk = false;
            console.log("El correo es obligatorio");
            displayMessage("El correo es obligatorio");
        }

        if (!conds.checked) {
            todoOk = false;
            console.log("Debes marcar la casilla obligatoria");
            displayMessage("Debes marcar la casilla obligatoria");
        }

        if (todoOk) {
            valida();
            var form1 = document.getElementById("form1");
            form1.reset();
        }
    }, 1000);
}

// Controlar los textos de las casillas de texto (Primer formulario) /JavaScript/
function removeLabel() {
    var nombreInput = document.getElementById("nombre");
    var nombreLabel = document.querySelector('label[for="nombre"]');
    var emailInput = document.getElementById("correo");
    var emailLabel = document.querySelector('label[for="correo"]');

    nombreInput.addEventListener("input", () => {
    if (nombreInput.value.trim() !== "") {
        nombreLabel.classList.add("focused");
    } else {
        nombreLabel.classList.remove("focused");
    }
    });

    emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") {
        emailLabel.classList.add("focused");
    } else {
        emailLabel.classList.remove("focused");
    }
    });
}

// Insertar ToolTip (Primer formulario) /JavaScript/
function toolTip(elEvento) {
    var evento = elEvento || window.event;
    if(evento.type === 'mouseover') {
        return overlib('Estoy de acuerdo en que estos datos se almacenen y procesen con el fin de establecer contacto. Soy consciente de que puedo revocar mi consentimiento en cualquier momento.');
    } else if (evento.type === 'mouseout') {
        return nd();
    }
}

function descargarCSV() {
    fetch('../php/sacar_datos_form1.php')
        .then(response => response.text())
        .then(datosCSV => {
            const blob = new Blob([datosCSV], { type: 'text/csv' });

            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = window.URL.createObjectURL(blob);
            enlaceDescarga.download = 'datos.csv';
            enlaceDescarga.click();
        });
}