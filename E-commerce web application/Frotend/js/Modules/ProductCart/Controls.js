import {
    updateProductCart,
    createProductCart,
    deleteProductCart,
} from "../../service/fetchService.js"

const disableCardControls = (cardIndex) => {
    const btnCreateProductCart = document.getElementById(`btnCreateProductCart` + cardIndex);
    const elements = [
        `btnIncreaseAmount`,
        `btnDecreaseAmount`,
        `inpAmount`
    ].map(id => document.getElementById(id + cardIndex));
    if (btnCreateProductCart === null) {
        elements.forEach(element => element.disabled = true);
    } else {
        btnCreateProductCart.disabled = true;
    }
};

const getInputAmount = (cardIndex) => document.getElementById(`inpAmount${cardIndex}`);
const getUpdateButton = (cardIndex) => document.getElementById(`btnUpdateProductCart${cardIndex}`);

const updateButtonStyle = (button) => {
    button.textContent = 'Actualizado';
    button.style.backgroundColor = '#28a745'
};

export const callCreateProductCart = (cardIndex) => {
    const inpAmount = getInputAmount(cardIndex);
    createProductCart(1, inpAmount.name, inpAmount.value);
    disableCardControls(cardIndex);
};

export const callDeleteProductCart = (cardIndex) => {
    const productId = getInputAmount(cardIndex);
    const productCartCard = document.getElementById(`productCartCard${cardIndex}`);
    deleteProductCart(1, productId.name);
    productCartCard.remove();
};

export const callUpdateProductCart = (cardIndex) => {
    const updateButton = getUpdateButton(cardIndex);
    const inpAmount = getInputAmount(cardIndex);
    if (inpAmount.value > 0) {
        updateButtonStyle(updateButton);
        updateProductCart(1, inpAmount.name, inpAmount.value);
    }
};

window.callDeleteProductCart = callDeleteProductCart;
window.callUpdateProductCart = callUpdateProductCart;

