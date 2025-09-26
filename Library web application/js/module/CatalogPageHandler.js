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
        this.divBookCartContainer = $(".divBookCartContainer");
        this.paginationHandler = new PaginationHandler();
        this.searchFilters = new SearchFilters(this.divFilterContainer);
        this.localStorageHandler.CreateStorageForBooks("bookshelve");
        this.localStorageHandler.CreateStorageForBooks("cart");
        this.localStorageHandler.CreateStorageForBooks("historical");
    }

    ShowPage = () => {
        $(this.liCatalogPage).on("click", () => {
            sessionStorage.setItem("currentPage", "catalog");
            this.DisplayContainer([this.containerCatalog, this.divBookCartContainer]);
            this.RenderCatalogElements();
        });
    }

    ShowPageAfterForm = () => {
        sessionStorage.setItem("currentPage", "catalog");
        this.DisplayContainer([this.containerCatalog, this.divBookCart]);
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
        // Render
        this.render.CheckCarousel();
        this.render.RenderBookInStorage("historical", ".listBookSeen");
        this.render.RenderBookInStorage("cart", ".divBookCart");
        // Pagination
        this.paginationHandler.LoadPage(1);
        this.paginationHandler.ChangePage();
    }
}
