import { appendContainersToDivMain, createContainer } from "../../component/DivHandler.js";
import { getProductCart } from "../../service/fetchService.js";
import { renderInvoice } from "../Order/Invoice.js";

var divProductCart;
var divCompletePurchase;
var liProductCart = document.getElementById("liProductCart");
var counterProductCart = 1;

export const createFinishBuyButton = () => `
<button id='btnCompletePurchase' type="button" onClick="renderInvoice()" class="btn btn-primary btn-lg btn-block">Finalizar compra</button>
`;
window.renderInvoice=renderInvoice;
export const createProductCartCard = (productId, image, name, price, brand, numero, amount) => `
  <div class="card w-95 p-3" id="productCartCard${numero}">
  <div class="d-flex justify-content-between align-items-start">
      <div class="mt-2">
          <h4 id='title${productId}'>${name}</h4>
          <div class="mt-5">
              <h5 class="text-uppercase mb-0">${brand}</h5>
              <h1 class="main-heading mt-0">${"$" + price}</h1>
          </div>
      </div>
      <div class="image mt-2" id="imgProductCartCard">
          <image src="${image}" width="150">
      </div>
      <button class="btnDangerProductCart" id="btnDeleteProductCart${numero}" type="button" onClick="callDeleteProductCart(${numero})">X</button>
  </div>       
  <div class="align-items-center" id="divProductController">
      <button id='btnIncreaseAmount${numero}' type="button" onClick="increaseAmount(${numero})">+</button>
      <button id="btnDecreaseAmount${numero}" type="button" onClick="decreaseAmount(${numero})">-</button>
      <input id='inpAmount${numero}' name="${productId}" type="number" min=0 minLength=1 value=${amount} placeholder="" readonly></input>
      <button class="btnWarningProductCart" id="btnUpdateProductCart${numero}" type="button" onClick="callUpdateProductCart(${numero})">Modificar</button>
  </div>    
`;

export const appendProductCartToDOM = (amount, { name, image, price, productId, brand }) => {
    divProductCart = document.getElementById('divProductCart');
    divProductCart.innerHTML += createProductCartCard(productId, image, name, price, brand, counterProductCart, amount);
    divCompletePurchase = document.getElementById('divCompletePurchase');
    divCompletePurchase.innerHTML = createFinishBuyButton();
    counterProductCart++;
};

export const renderProductCart = async () => {
    divProductCart=createContainer('divProductCart');
    divCompletePurchase=createContainer('divCompletePurchase');
    appendContainersToDivMain(divProductCart, divCompletePurchase);
    for (let i = 0; i < localStorage.length; i++) {
        const productId = localStorage.key(i);
        const product = JSON.parse(localStorage.getItem(productId));
        try {
            const json = await getProductCart(product.productId, product.amount);
            appendProductCartToDOM(product.amount, json);
        } catch (error) {
            console.error("Error al obtener el producto del carrito:", error);
        }
    }
};

export const initializeProductCart = () => {
    liProductCart.addEventListener("click", renderProductCart);
};
