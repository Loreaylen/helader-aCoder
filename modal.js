$("#botonPagar").click(() => {
    $(".modal__contenedor").fadeIn(600)
    $(".modal__contenedor").css('display', 'flex')
    $(".modal").hide()
    $(".modal").slideDown(1000)

})

$("#modalQuitar").click(() => {
    $(".modal__contenedor").fadeOut(400)    
})

