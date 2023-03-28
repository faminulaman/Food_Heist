let carts = document.querySelectorAll('.btnn');


let products = [
{
    name: 'CHICKEN WINGS',
    tag: 'chickenwings',
    price: 220,
    inCart: 0
},
{
    name: 'CHICKEN BBQ',
    tag: 'chickenbbq',
    price: 250,
    inCart: 0
},
{
    name: 'SMOKEY BBQ',
    tag: 'smokeybbq',
    price: 200,
    inCart: 0
},
{
    name: 'FRIED CHICKEN',
    tag: 'friedchicken',
    price: 130,
    inCart: 0
}
];


for(let i=0; i < carts.length; i++)
{
    carts[i].addEventListener('click',() =>
    {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
   
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } 
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productInCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }

  
}

function displaycart() {
    let cartItems =localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    
    console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}M/span>
            </div>
            <div class="price">${item.price}</div>
              
            `
        });
    }

}
 onLoadCartNumbers(); 
 displaycart();


