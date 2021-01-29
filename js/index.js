const canastaContainer  = document.querySelector('#contenedor-productos-carrito');
const containerProducts = document.querySelector('.cards__container');

let canastaCompras = [];


containerProducts.addEventListener('click', obtenerProducto);
canastaContainer.addEventListener('click', deleteFromCanasta);

function deleteFromCanasta(e){

    const producto = e.target.classList.contains('delete-btn');
    
    if(producto){
        const id = e.target.getAttribute('data-id');
        canastaCompras = canastaCompras.filter( product => product.id !== id);
        canastaHTML();
    }
}


function obtenerProducto(e){

    e.preventDefault();

    if(e.target.classList.contains('add--carrito')){
        const cardProduct = e.target.parentElement.parentElement;

        let infoProduct = {
            id: cardProduct.getAttribute('data-id'),
            img: cardProduct.querySelector('img').src,
            title: cardProduct.querySelector('h2').textContent,
            price:cardProduct.querySelector('p span').textContent,
            quantity: 1
        }

        addCanasta(infoProduct)
    };      

}

function addCanasta(producto){

    const duplicated = canastaCompras.some(productIn => productIn.id === producto.id);
    
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
    } else {
        canastaCompras = [...canastaCompras, producto];
    }

    canastaHTML();

}

function canastaHTML(){

    cleanHtml();

    canastaCompras.forEach(producto => {
        const ul = document.createElement('ul');
        ul.classList.add('canasta__content');

        let { id, img, title, price, quantity} = producto;

        ul.innerHTML = `
            <li class="item__img"><img src="${img}" alt="product"></li>
            <li>${title}</li>
            <li>Precio:  ${price}  <span>$</span></li>
            <li>Cantidad: <span>${quantity}</span></li>
            <li><span class="delete-btn cursor--pointer" data-id="${id}">x</span></li>
        `;
        
        canastaContainer.append(ul);
    })

    if(canastaCompras.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `
        <h3>Ups!!!</h3>
        <p>Parece que tu canasta esta vacia</p>
        `;

        canastaContainer.append(div);
    }

}

function cleanHtml(parentNode = canastaContainer){
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild);
    }
}