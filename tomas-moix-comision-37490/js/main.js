
let cartas = document.getElementById("conteiner__cards")
let carritoaparecer = document.getElementById("carritoaparecer")
let carritodesaparecer = document.getElementById("carritodesaparecer")
let carritoestado = document.getElementById("carrito")
console.log(carritodesaparecer)



const iva = X => X * 0.21

let pagar = 0

//Carrito Despegable

carritoaparecer.onclick = () =>{
    carritoestado.style.right= 0
}
carritodesaparecer.onclick = () =>{
    carritoestado.style.right= -100 + "%"
}




function mostrarCards(){
    Inventario.forEach(prod =>{
        let div = document.createElement("div")
        div.className = "cards"
        div.innerHTML = `<img class="cards__img" src=./img/${prod.img}>
                            <div class="cards_body">
                                <h4 class="cards__titulo">${prod.producto}</h4>
                                <p class="cards__descripcion">Descripcion: ${prod.desc}</p>
                                <p class="cards__precio">$${prod.precio}</p>
                                <button id="botonComprar${prod.id}" class="cards__button">Agregar al Carro</button>
                            </div>`
    cartas.appendChild(div)
    let botonComprar = document.getElementById(`botonComprar${prod.id}`)
    botonComprar.onclick = ()=>{
        cart(prod.id)
        Toastify({
            text: `Agregaste ${prod.producto} al carrito`,
            position: 'center',
            backgroundColor: "#9f9fdd",
            className: "alert"
            
            
          }).showToast();
    } 
  })
}
mostrarCards()

//Agregar al carrito

const carrito = JSON.parse(localStorage.getItem("productos")) || []


let cartconteiner = document.getElementById("agregar__productos")

function cart (prodId){
    let prod = Inventario.find( prod => prod.id == prodId)
    carrito.push(prod)
    agregarCarrito()   
    CarritoPagar()
    console.log(carrito)
}   

let agregarCarrito = () =>{
    cartconteiner.innerHTML = ""
    carrito.forEach(prod =>{
    let div = document.createElement("div")
        div.className = "carrito__formulario"
        div.innerHTML += `<p>${prod.producto}</p>
                        <p>Cant: 1</p>
                        <p>Precio: $${prod.precio}</p>
                        <button class="boton__eliminar" onClick=deleteProduct(${carrito.indexOf(prod)})><span class= "jam jam-trash-f trash"></span>
                        `
    cartconteiner.appendChild(div)
    localStorage.setItem("productos", JSON.stringify(carrito))

    
    
    })
}
    

function deleteProduct(prod){

    carrito.splice(prod, 1)
    console.log(carrito)
    agregarCarrito()
    CarritoPagar()
    
}

// Suma total

let totalText = document.getElementById("Total")

function CarritoPagar (){

    let precios = carrito.map((prod) => prod.precio)
    let pagar = precios.reduce((acumulador, precio) => acumulador + precio,0)
    let totalIva = iva(pagar)
    let totalPagar = pagar + totalIva
    totalText.textContent = "Total(iva) =" + "$" + totalPagar
    console.log(totalPagar)
    
}
