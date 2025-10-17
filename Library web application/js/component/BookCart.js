import { LocalStorageHandler } from "./LocalStorageHandler.js";

export class BookCart {
    constructor(divName) {
        this.$divName = $(divName);
        this.localStorageHandler = new LocalStorageHandler();
    }

    Create = ({ json }) => {
        return `
            <div class="bookCart" data-title="${json.title}">
                <img class="bookCartImage" src="${json.image}"/>
                <div class="bookCartInfo">
                    <h4 class="bookCartTitle"><strong>${json.title}</strong></h4>
                    <p class="bookCartAuthor">${json.author}</p>
                    <div class="divBtnRemoveBookCart">
                        <button class="btnRemoveBookCart">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    }

    Append = (json) => {
        this.$divName.append(this.Create({ json }));
    }

    AssignEventHandler = () => {
        let $cartCount = $(".bookCartCount");
        this.$divName.on("click", ".btnRemoveBookCart", (e) => {
            const $bookCart = $(e.target).closest(".bookCart");
            const title = $bookCart.data("title");
            this.localStorageHandler.DeleteBookDataFromStorage("cart", title);
            let array = this.localStorageHandler.GetStorage("cart");
            $cartCount.text(array.length);
            $bookCart.remove();
        });
    }

    AssignEventHandlerContainer = () => {
        const $btnBookCart = $("#btnBookCart");
        const $cartDropdown = $("#bookCartDropdown");
        $btnBookCart.on("click", () => {
            $cartDropdown.toggle();
        });
        $(document).on("click", function (e) {
            if (
                !$cartDropdown.is(e.target) &&
                $cartDropdown.has(e.target).length === 0 &&
                !$btnBookCart.is(e.target) &&
                $btnBookCart.has(e.target).length === 0
            ) {
                $cartDropdown.hide();
            }
        });
    }
}