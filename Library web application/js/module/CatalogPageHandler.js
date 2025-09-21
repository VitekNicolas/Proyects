import { BookCart } from "../component/BookCart.js";
import { PaginationHandler } from "../component/PaginationHandler.js";
import { SearchFilters } from "../component/SearchFilters.js";
import { Render } from "./Render.js";
import { BasePageHandler } from "./BasePageHandler.js";

export class CatalogPageHandler extends BasePageHandler {

    constructor() {
        super();
        this.render = new Render();
        this.bookCart = new BookCart();
        this.divBookCart = document.querySelector(".divBookCart");
        this.paginationHandler = new PaginationHandler();
        this.searchFilters = new SearchFilters(this.divFilterContainer);
        this.localStorageHandler.CreateStorageForBooks("bookshelve");
        this.localStorageHandler.CreateStorageForBooks("cart");
        this.localStorageHandler.CreateStorageForBooks("historical");
    }

    ShowPage = () => {
        this.liCatalogPage.addEventListener("click", () => {
            sessionStorage.setItem("currentPage", "catalog");
            this.containerForm.setAttribute("hidden", "");
            this.containerHome.setAttribute("hidden", "");
            this.divBookCartContainer.removeAttribute("hidden");
            this.containerCatalog.removeAttribute("hidden");
            this.RenderCatalogElements();
        });

    }

    ShowPageAfterForm = () => {
        //Create storages
        sessionStorage.setItem("currentPage", "catalog");
        this.containerForm.setAttribute("hidden", "");
        this.containerCatalog.removeAttribute("hidden");
        //Render
        this.RenderCatalogElements();
    }

    AddEventHandler = () => {
        // BookCart
        this.bookCart.AssignEventHandler();
        this.bookCart.AssignEventHandlerContainer(this.divBookCart);
        // Filters
        this.searchFilters.AddEventListenerToBtnSearchByYears();
        this.searchFilters.AddEventListenerBtnReset();
        this.searchFilters.AddEventListenerToBtnSearchByAuthorName();
        this.searchFilters.AddEventListenerToBtnSearchByTopic();
        this.searchFilters.AddEventListenerToInpCopyright();
        this.searchFilters.AddEventListenerToInpLanguage();
        this.searchFilters.AddBehaviorToAside();
    }

    RenderCatalogElements = () => {
        //Render
        this.render.CheckCarousel();
        this.render.RenderBookInStorage("historical", ".listBookSeen");
        this.render.RenderBookInStorage("cart", ".divBookCart");
        // Pagination
        this.paginationHandler.LoadPage(1);
        this.paginationHandler.ChangePage();
    }
}