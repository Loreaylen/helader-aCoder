class Producto {
    constructor(cantidad, precio, sabor, id) {
        this.cantidad = cantidad,
            this.precio = precio,
            this.sabor = sabor,
            this.id = id;
    }
}
const input = document.getElementsByClassName('check')

// Variables y constantes

const carritoDeCompras = JSON.parse(localStorage.getItem('carrito')) || [];
const precioFinal = $(`<span id="total"></span>`)
const precioFinalModal = $(`<span id="totalCompra"></span>`)
let botonAgregar = $('#boton')
let opcionCantidad = $('.hidebtn')
let botonQuitar = $('.botonQuitar')
let span = $('#mensajeSabores')
var cantidadElegida;
let carritoLocalStorage;
let documentoJSON = "./productos.json"; // Lista de sabores
let linkPagar = $("#linkPagar")



// Funciones

// Función de llamada Ajax

const llamarAjax = () => {
    $.getJSON(documentoJSON, function (respuesta, estado) {
        if (estado === "success") {
            productos = respuesta;
            imprimirSabores(productos)

        } else {
            console.log("Error")
        }
    })
}

const imprimirSabores = (productos) => {
    let indice = 0;

    for (let producto in productos) {

        if (productos[producto].tipo === "crema") {
            $(".gustos").append(`<li>
            <input type="checkbox" name="gustos" class="check" id="chk${indice++}" value="${productos[producto].nombre}">
            <label for="chk${indice - 1}" class="checkbtn">${productos[producto].nombre}</label>   
            </li>`)
        } else {

            $(".gustos2").append(`<li>
            <input type="checkbox" name="gustos" class="check" id="chk${indice++}" value="${productos[producto].nombre}">
            <label for="chk${indice - 1}" class="checkbtn">${productos[producto].nombre}</label>   
            </li>`)

        }
    }



}

$(`<h4>EN CREMA</h4>`).insertBefore(".gustos")

$(`<h4>AL AGUA</h4>`).insertBefore(".gustos2")


const verTotal = (e) => {

    precioFinal.html(`Total: $${e}`)
    $(`#carrito`).append(precioFinal)
    precioFinalModal.html(`Total: $${e}`)
 
    $("#totalCompra").append(precioFinalModal)
    
}



const agregarSabor = (arrayVacio) => {

    let input = $('.check')

    for (let i = 0; i < input.length; i++) {
        if (input[i].checked === true) {
            arrayVacio.push(input[i].value)
        }
    }


}



const agregarProducto = () => {

    // limitar sabores 
    let saboresInputs = []
    let mensaje = $("#mensaje")
    let limiteSabor = 0;

    for (let i = 0; i < input.length; i++) {
        let sabores = Number(input[i].checked);

        saboresInputs.push(sabores)

        limiteSabor = saboresInputs.reduce((a, b) => {
            return a + b
        })

        if (limiteSabor > 3) {
            return mensaje.text("¡Solo puedes elegir 3 sabores!")

        }
    }


    var opcion = $('input[name=cantidad]:checked').val()


    if (opcion == '1 kg') {
        var producto = new Producto("1kg", 700, [], carritoDeCompras.length + 1)
        agregarSabor(producto.sabor)
    } else if (opcion == '1/2 kg') {
        var producto = new Producto("1/2kg", 400, [], carritoDeCompras.length + 1)
        agregarSabor(producto.sabor)
    } else if (opcion == '1/4 kg') {
        var producto = new Producto("1/4kg", 200, [], carritoDeCompras.length + 1)
        agregarSabor(producto.sabor)
    } else {
        return alert("Datos erróneos")
    }

    carritoDeCompras.push(producto)
    guardarEnLocalStorage(carritoDeCompras)
    traerLocalStorage()



}


const guardarEnLocalStorage = (arr) => {
    localStorage.setItem("carrito", JSON.stringify(arr))

}


const traerLocalStorage = () => {

    let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    $("#agregados").text("")





    if (carritoLocalStorage) {
        for (let e of carritoLocalStorage) {
            

            $("#agregados").append($(`<li class= "listado"   id=li${e.id}  
            >
            <h5>${e.cantidad}</h5> 
            <h6>ID: ${e.id}</h6> 
            <p>${e.sabor}</p>
            <span>$${e.precio}</span>
            <button class="botonQuitar">Eliminar</button>
            </li>`))
            
            $(".botonQuitar").click(() => eliminarCarrito(e.id))


        }

       

        let total = 0;
        carritoLocalStorage.forEach(element => {
            return (total += element.precio)
        })



        verTotal(total)
    } else {
        carritoLocalStorage = []
    }


}





const eliminarCarrito = (id) => {

    const items = JSON.parse(localStorage.getItem('carrito'));
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(filtered));

    traerLocalStorage()

    for (objeto of items) {
        if (objeto.id === id) {
            let indice = items.indexOf(objeto)
            carritoDeCompras.splice(indice, 1)
        }
    }
}




// Eventos




const form = document.getElementById("form")

const submitForm = (event) => {
    event.preventDefault()
    agregarProducto()
}

form.addEventListener("submit", submitForm)

$(document).ready(() => {
    traerLocalStorage()
})

linkPagar.click(() => {
    $("#modalQuitar").trigger("click")
    alert("¡Su pedido ha sido realizado con éxito!")

    localStorage.removeItem("carrito")
    location.reload()
    
})

imprimirSabores()
llamarAjax()



//FUNCIONES DE MODAL


$("#botonPagar").click(() => {

    if (carritoDeCompras.length > 0) {


        $(".modal__contenedor").fadeIn(600)
        $(".modal__contenedor").css('display', 'flex')
        $(".modal").hide()
        $(".modal").slideDown(1000)
    } else {
        alert("Agregue un producto al carrito")
    }
})



$("#modalQuitar").click(() => {
    $(".modal__contenedor").fadeOut(400)
})