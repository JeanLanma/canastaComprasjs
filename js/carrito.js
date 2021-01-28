const canastaContaier = document.querySelector('#contenedor-productos-carrito');
const canasta = document.querySelector('.cards__container');
const noItems = document.querySelector('#no-items');

let canastaCompras = [];

/* Listeners */
function eventListeners(){
    canasta.addEventListener('click', getProducts);
    canastaContaier.addEventListener('click', deleteProduct)
}
eventListeners();

/* Funciones */
function getProducts (e) {
    let producto = {};
    e.preventDefault();
    if(e.target.classList.contains('add--carrito')){
        let productCard = e.target.parentElement.parentElement;
        
        producto = {
            id: productCard.getAttribute('data-id'),
            img: productCard.querySelector('img').src,
            title: productCard.querySelector('.card__title').textContent,
            price: productCard.querySelector('span').textContent,
            quantity: 1
        }

        addCarrito(producto);

    }
}

function addCarrito(producto){

    const duplicated = canastaCompras.some(product => product.id === producto.id)

        if(duplicated){
            const productos = canastaCompras.map( product => {
                if(product.id === producto.id){
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            canastaCompras = [...productos];
        }else {
            canastaCompras = [...canastaCompras, producto];
        }

    canastaHTML()
}

function canastaHTML(){

    cleanHtml();

    canastaCompras.forEach(product => {

        const row = document.createElement('ul');
        row.classList.add('canasta__content');

        row.innerHTML = `
            <li class="item__img"><img src="${product.img}" alt="product"></li>
            <li>${product.title}</li>
            <li>Precio: ${product.price} <span>$</span></li>
            <li>Cantidad: <span>${product.quantity}</span></li>
            <li><span class="delete-btn cursor--pointer"  data-id="${product.id}">x</span></li>
        `;

        canastaContaier.append(row);
    });

    noItems.hidden = true;
}

function deleteProduct(e){

    if(e.target.classList.contains('delete-btn'))
    {
        const productId = e.target.getAttribute('data-id');
        canastaCompras = canastaCompras.filter( product => product.id !== productId);
        canastaHTML();
        if(canastaCompras.length <= 0){
            console.log('Canasta vacia')
            noItems.hidden = false;
        }
    }
}

function cleanHtml(parentNode = canastaContaier){
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild)
    }
}