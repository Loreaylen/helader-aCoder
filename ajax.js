let archivoJSON = "./sabores.json"
var sabores;



const imprimirSabores = (arr) => { 
    for (let sabor of arr) {
        $("#contenedorAjax").append(`<div class="tarjeta">

        <div class="tarjeta__header"><img src=${sabor.imagen} alt="Helado de ${sabor.nombre}"></div>
        <div class="tarjeta__texto"><span>${sabor.nombre}</span>
        <p>${sabor.texto}</p>
        
        </div>
        
    </div>`)
    }
}



const llamadaAjax = () => {
    $.getJSON(archivoJSON, function (respuesta, estado) {
        if (estado === "success") {
          sabores = respuesta;
          imprimirSabores(sabores) 
            
        }
        else {console.log("Error")}
    })
 
}

llamadaAjax()
 