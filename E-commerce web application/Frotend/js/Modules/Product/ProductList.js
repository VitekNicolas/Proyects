import { appendContainersToDivMain, createContainer } from "../../component/DivHandler.js";
import { getProduct } from "../../service/fetchService.js";
import { callCreateProductCart } from "../ProductCart/Controls.js";
import { increaseAmount } from "./Controls.js";
import { decreaseAmount } from "./Controls.js";

var divProductList;
const liProductList = document.getElementById("liProductList");

export const createProductCard = ({ productId, image, name, brand, price, code, description }, index) => ` 
    <div class="card p-4 border border-primary rounded" id="productCard${index}">
        <img class="card-image" src="${image}" alt="${name}">
        <div class="d-flex justify-content-between align-items-center"></div>
        <div class="card-body" id="cardBody${index}">
            <h4 class="card-title" id='title${productId}'>${name}</h4>
            <h6 class="card-subtitle mb-2 text-muted">${brand}</h6>
            <p class="card-text">${description}. Código: ${code}</p>
            <div id="divProductController">
                <button id='btnIncreaseAmount${index}' type="button" onClick="increaseAmount(${index})">+</button>
                <button id="btnDecreaseAmount${index}" type="button" onClick="decreaseAmount(${index})">-</button>
                <input id='inpAmount${index}' name=${productId} type="number" min="0" value="0" readonly></input>
            </div>
            <div class="buy d-flex justify-content-between align-items-center">
                <div class="price text-success"><h5 class="mt-4">${"$" + price}</h5></div>
                <button class="btn btn-primary" id="btnCreateProductCart${index}" type="button" onClick="callCreateProductCart(${index})">Agregar al carrito</button>
            </div>
        </div>
    </div>
`;
window.decreaseAmount=decreaseAmount;
window.increaseAmount=increaseAmount;
window.callCreateProductCart=callCreateProductCart;

const appendProductToDiv = (productData, index) => {
    divProductList = document.getElementById('divProductList');
    divProductList.innerHTML += createProductCard(productData, index);

};

const renderProductList = async () => {
    divProductList=createContainer('divProductList');
    appendContainersToDivMain(divProductList);
    for (let i = 1; i <= 10; i++) {
        const productData = await getProduct(i);
        appendProductToDiv(productData, i);
    }
};

export const initializeProductList = () => {
    liProductList.addEventListener("click", renderProductList);
};