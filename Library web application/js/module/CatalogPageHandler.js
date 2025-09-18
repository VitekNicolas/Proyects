import { BookCart } from "../component/BookCart.js";
import { LocalStorageHandler } from "../component/LocalStorageHandler.js";
import { PaginationHandler } from "../component/PaginationHandler.js";
import { SearchFilters } from "../component/SearchFilters.js";
import { Render } from "./Render.js";

export class CatalogPageHandler {
    constructor() {
        this.liCatalogPage = document.getElementById("liCatalogPage");
        this.render = new Render();
        this.aside = document.querySelector(".aside");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.divAdContainer = document.querySelector(".divAdContainer");
        this.divPagination = document.querySelector(".divPagination");
        this.divBookCartContainer = document.querySelector(".divBookCartContainer");
        this.bookCart = new BookCart();
        this.divBookCart = document.querySelector(".divBookCart");
        this.localStorageHandler = new LocalStorageHandler();
        this.paginationHandler = new PaginationHandler();
        this.searchFilters = new SearchFilters(this.aside);
    }

    AddEventHandler = () => {
        this.liCatalogPage.addEventListener("click", () => {
            this.divFilterContainer.removeAttribute("hidden");  
            this.divPagination.removeAttribute("hidden");
            this.divBookCartContainer.removeAttribute("hidden");
            this.divAdContainer.setAttribute("hidden", "");
            this.ShowCatalogPage();
        });
    }

    ShowCatalogPage = () => {
        // Storages
        this.localStorageHandler.CreateStorageForBooks("bookshelve");
        this.localStorageHandler.CreateStorageForBooks("cart");
        this.localStorageHandler.CreateStorageForBooks("historical");
        //Render
        this.render.CheckCarousel();
        this.render.RenderBookInStorage("historical", ".listBookSeen");
        this.render.RenderBookInStorage("cart", ".divBookCart");
        // Pagination
        this.paginationHandler.LoadPage(1);
        this.paginationHandler.ChangePage();
        // BookCart
        this.bookCart.AssignEventHandlerContainer(this.divBookCart);
        // Filters
        this.searchFilters.AddBeheaviorToBtnSearchByYears();
        this.searchFilters.AddEventListenerToBtnSearchByYears();
        this.searchFilters.AddEventListenerBtnReset();
        this.searchFilters.AddEventListenerToBtnSearchByAuthorName();
        this.searchFilters.AddEventListenerToBtnSearchByTopic();
        this.searchFilters.AddEventListenerToInpCopyright();
        this.searchFilters.AddEventListenerToInpLanguage();
        this.searchFilters.AddBehaviorToAside();
    }
}