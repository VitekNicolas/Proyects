import { searchProduct } from "../../service/fetchService.js";
import { createProductCard } from "./ProductList.js";
import { appendContainersToDivMain, createContainer } from "../../component/DivHandler.js";

var divProductList;
const btnProductSearch = document.getElementById("btnProductSearch");

export const appendFilteredProductsToDOM  = (FilteredProductsList) => {
    divProductList = document.getElementById('divProductList');
    for (let i = 0; i < FilteredProductsList.length; i++) {
        const { productId, image, name, brand, price, code, description } = FilteredProductsList[i];
        divProductList.innerHTML += createProductCard({ productId, image, name, brand, price, code, description }, i);
    }
};

export const renderFilteredProducts = async () => {
    divProductList=createContainer('divProductList');
    appendContainersToDivMain(divProductList);
    await searchProduct(appendFilteredProductsToDOM ); 
};

export const initializeFilteredProducts = () => {
    btnProductSearch.addEventListener("click", renderFilteredProducts);
};