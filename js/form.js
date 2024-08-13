$(document).ready(function () {
    $("#formTalCheckbox")[0].reset();

    $("#btn-submit-mainForm").click(function () {
        var errorMessageContainer = $("#message");
        var response = $("#respuesta");
        errorMessageContainer.html("");
        response.html("");

        Gif();

        setTimeout(function () {
            var nombre = $("#nombre").val();
            var apellido = $("#apellido").val();
            var was = $("#was").val();
            var correo = $("#correo").val();
            var pais = $("#pais").val();
            var ciudad = $("#ciudad").val();
            var info = $("#info").val();
            var conds = $("#conds");
            var allOk = true;

            if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
                allOk = false;
                console.log("Nombre obligatorio");
                dMessage("El nombre es obligatorio")
            }

            if (apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
                allOk = false;
                console.log("Apellido obligatorio");
                dMessage("El apellido es obligatorio")
            }

            if (was == null || was.length == 0 || /^\s+$/.test(was)) {
                allOk = false;
                console.log("Número obligatorio");
                dMessage("El número de teléfono es obligatorio")
            }

            if (!/^\d{9}$/.test(was)) {
                allOk = false;
                console.log("El número de telefono debe estar compuesto por numeros.")
                dMessage("El número de teléfono debe estar formado por 9 números");
            }

            if (correo == null || correo.length == 0 || /^\s+$/.test(correo)) {
                allOk = false;
                console.log("Correo obligatorio");
                dMessage("El correo es obligatorio")
            }

            if (!conds.prop("checked")) {
                allOk = false;
                console.log("Debes marcar la casilla obligatoria");
                dMessage("Debes marcar la casilla obligatoria")
            }

            if (allOk) {
                validar();
                $("#form2")[0].reset();
            }
        }, 1000);
    });

    $("#etiqueta").customTooltip();
    $('#descargarCSV2').click(function() {
        descargarCSV();
    });
});

function validar() {
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var was = $("#was").val();
    var correo = $("#correo").val();
    var pais = $("#pais").val();
    var ciudad = $("#ciudad").val();
    var info = $("#info").val();

    $.ajax({
        type: "POST",
        url: "../php/insertMainForm.php",
        data: {
            nombre: nombre,
            apellido: apellido,
            pais: pais,
            ciudad: ciudad,
            was: was,
            correo: correo,
            info: info,
        },
        success: function (response) {

            $("#message").html(response);
        },
        error: function () {

            $("#message").html("Error al enviar el formulario.");
        }
    });
}
function Gif() {
    $("#gif").css("display", "block");
    setTimeout(function () {
        $("#gif").css("display", "none");
    }, 1000);
}
function dMessage(message) {
    $("#message").append("<p>" + message + "</p>");
}
function removeLabel() {
    var nombreInput = $("#nombre");
    var nombreLabel = $('label[for="nombre"]');
    var apellidoInput = $("#apellido");
    var apellidoLabel = $('label[for="apellido"]');
    var paisInput = $("#pais");
    var paisLabel = $('label[for="pais"]');
    var ciudadInput = $("#ciudad");
    var ciudadLabel = $('label[for="ciudad"]');
    var wasInput = $("#was");
    var wasLabel = $('label[for="was"]');
    var emailInput = $("#correo");
    var correoLabel = $('label[for="correo"]');
    var infoInput = $("#info");
    var infoLabel = $('label[for="info"]');

    //Nombre
    nombreInput.on("input", function () {
        if (nombreInput.val().trim() !== "") {
            nombreLabel.addClass("focused");
        } else {
            nombreLabel.removeClass("focused");
        }
    });

    // Apellido
    apellidoInput.on("input", function () {
        if (apellidoInput.val().trim() !== "") {
            apellidoLabel.addClass("focused");
        } else {
            apellidoLabel.removeClass("focused");
        }
    });

    // Pais
    paisInput.on("input", function () {
        if (paisInput.val().trim() !== "") {
            paisLabel.addClass("focused");
        } else {
            paisLabel.removeClass("focused");
        }
    });

    // Ciudad
    ciudadInput.on("input", function () {
        if (ciudadInput.val().trim() !== "") {
            ciudadLabel.addClass("focused");
        } else {
            ciudadLabel.removeClass("focused");
        }
    });

    // Was
    wasInput.on("input", function () {
        if (wasInput.val().trim() !== "") {
            wasLabel.addClass("focused");
        } else {
            wasLabel.removeClass("focused");
        }
    });

    // Correo
    emailInput.on("input", function () {
        if (emailInput.val().trim() !== "") {
            correoLabel.addClass("focused");
        } else {
            correoLabel.removeClass("focused");
        }
    });

    // Info
    infoInput.on("input", function () {
        if (infoInput.val().trim() !== "") {
            infoLabel.addClass("focused");
        } else {
            infoLabel.removeClass("focused");
        }
    });

}
function descargarCSV() {
    $.ajax({
        url: '../php/sacar_datos_form2.php',
        method: 'GET',
        dataType: 'text',
        success: function(datosCSV) {
            const blob = new Blob([datosCSV], { type: 'text/csv' });

            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = window.URL.createObjectURL(blob);
            enlaceDescarga.download = 'datos_form2.csv';
            enlaceDescarga.click();
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error);
        }
    });
}

$.fn.customTooltip = function () {
    return this.each(function () {
        var $element = $(this);

        $element.on({
            mouseover: function () {
                overlib('tsp-soluciones se compromete a proteger y respetar tu privacidad, y solo usaremos tu información personal para administrar tu cuenta y proporcionar los productos y servicios que nos solicitaste. De vez en cuando, nos gustaría ponernos en contacto contigo acerca de nuestros productos y servicios, así como sobre otros contenidos que puedan interesarte. Si aceptas que nos comuniquemos contigo para este fin, marca la casilla a continuación para indicar cómo deseas que nos comuniquemos.');
            },
            mouseout: function () {
                nd();
            }
        });
    });
};