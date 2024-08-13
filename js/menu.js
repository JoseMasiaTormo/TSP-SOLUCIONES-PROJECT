// Función encargada de abrir y cerrar el menú lateral /JQuery/
$(document).ready(function(){
    $("#checkbox").change(function(){
      if(this.checked){
        $('#sombra').animate({
          width: '100%'
        }, 1000);
        $('#mySidebar').animate({
          width: "230px"
        }, 1000);
      } else {
        $('#mySidebar').animate({
          width: '0'
        }, 1000);
        $('#sombra').animate({
          width: '0%'
        }, 1000);
      }
    });
  });