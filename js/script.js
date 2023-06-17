 const CartIcon = document.querySelector('#cart-icon');
 const Cart = document.querySelector('.cart'); 
 const btnClose = document.querySelector('#add-close');

 CartIcon.addEventListener('click',()=>{
    Cart.classList.add('cart-active');
 });
 btnClose.addEventListener('click',()=>{
    Cart.classList.remove('cart-active')
 });

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContant();
}

function loadContant(){
    const btnRemove = document.querySelectorAll('.add-remove')
    btnRemove.forEach((btn)=> {
        btn.addEventListener('click',removeItem);
    });
    let qtyElement = document.querySelectorAll('.cart-quantity');

    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    const CartBtns =document.querySelectorAll('.add-cart')
    CartBtns.forEach((btn)=>{
      btn.addEventListener('click',addCart)
    });

 UpdateTotal();
}
function removeItem(){
    if(confirm("Are You Sure to Delete...")){
    let tittle = this.parentElement.querySelector('.cart-food').innerHTML;
    //console.log(tittle);
    itemList=itemList.filter((el)=>el.tittle!=tittle);
    this.parentElement.remove();
    }
    loadContant()
}

function changeQty(){
    if(isNaN(this.value) || this.value<1){
       this.value = 1;
    }
    loadContant();
}

let itemList =[];

function addCart(){
    let food = this.parentElement;
    let tittle = food.querySelector('.food-tittle').innerHTML;
    let Price = food.querySelector('.food-price').innerHTML;
    let ImgSrc = food.querySelector('.food-img').src;

    let newProduct = {tittle,Price,ImgSrc}
     if(itemList.find((e)=>e.tittle==newProduct.tittle)){
        alert("Product Already Added in Your Cart");
        return
     }else{
        itemList.push(newProduct)
     }
     console.log(itemList)
    let NewProductElements =CreateCartProduct(tittle, Price , ImgSrc)
    let Element = document.createElement('div')
    Element.innerHTML=NewProductElements;
    let cartbasket = document.querySelector('.cart-contant');
    cartbasket.append(Element);
    loadContant();
    
}

function CreateCartProduct(tittle,Price,ImgSrc){
 return `  <div class="cart-box">
 <img src="${ImgSrc}" alt="">
 <div class="details-box">
   <h3 class="cart-food">${tittle}</h3>
   <div class="price-box">
       <div class="cart-price">${Price}</div>
       <div class="cart-amt">${Price}</div>
   </div>
   <input type="number" class="cart-quantity" value="1">
 </div>
 <ion-icon name="trash" class= "add-remove"></ion-icon>
</div>` 
}

function UpdateTotal(){
    let cartItems = document.querySelectorAll('.cart-box');
    let totalValue = document.querySelector('.total-price');
   
    let total=0;

    cartItems.forEach(product=>{
        let PriceElement=document.querySelector('.cart-price')
        let price =parseFloat(PriceElement.innerHTML.replace('Rs.',""));
        let qty =product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        //console.log(total)
        product.querySelector('.cart-amt').innerText='Rs.'+(price*qty);

    });
    totalValue.innerHTML='Rs.'+total;
    
    let cartCount = document.querySelector('.cart-select');
    console.log(cartCount)
    let count=itemList.length;
    console.log(count)

    cartCount.innerHTML=count;

    if(count==0){
       cartCount.style.display='none';
       return
    }else{
        cartCount.style.display='block';
    }


    }







