import { LocalStorageHandler } from "./LocalStorageHandler.js";

export class BookCart {
    constructor(divName) {
        this.divName = divName;
        this.localStorageHandler = new LocalStorageHandler();
    }
    Create = ({ json }) => {
        return `<div class="bookCart" id="bookId" data-title="${json.title}">
                    <img class="cart-img" src="${json.image}"/>
                    <div class="cart-info">
                        <h4 class="bookCartTitle">${json.title}</h4>
                        <p class="bookCartAuthor">${json.author}</p>
                        <div class="cart-actions">
                            <button class="btnCartRemove">Eliminar</button>
                        </div>
                    </div>
                </div>`
    }
    Append = (json) => {
        this.divName.innerHTML += this.Create({ json });
    }
    AssignEventHandler = () => {
        const cards = this.divName.querySelectorAll(".bookCart");
        let cartCount = document.querySelector("#cart-count");
        cards.forEach(bookCart => {
            let btnCartRemove = bookCart.querySelector(".btnCartRemove");
            btnCartRemove.addEventListener("click", () => {
                this.localStorageHandler.DeleteBookDataFromStorage("cart", bookCart.dataset.title);
                let array = this.localStorageHandler.GetStorage("cart");
                cartCount.textContent = array.length;
                bookCart.remove();
            })
        });
    }

    AssignEventHandlerContainer = () => {
        const cartBtn = document.querySelector(".cartBtn");
        const cartDropdown = document.getElementById("cart-dropdown");
        cartBtn.addEventListener("click", () => {
            cartDropdown.style.display =
                cartDropdown.style.display === "block" ? "none" : "block";
        });
        document.addEventListener("click", (e) => {
            var target = e.target;
            if (!cartBtn.contains(target) && !cartDropdown.contains(target)) {
                cartDropdown.style.display = "none";
            }
        });
    }
}