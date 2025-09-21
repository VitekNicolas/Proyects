import { BasePageHandler } from "./BasePageHandler.js";

export class HomePageHandler extends BasePageHandler {

    constructor() {
        super();
        this.liHomePage = document.getElementById("liHomePage");
        this.localStorageHandler.CreateStorageForBooks("popular");
        this.localStorageHandler.FillPopular();
    }

    ShowPage = () => {
        this.liHomePage.addEventListener("click", () => {
            sessionStorage.setItem("currentPage", "home");
            this.containerForm.setAttribute("hidden", "");
            this.containerCatalog.setAttribute("hidden", "");
            this.divBookCartContainer.setAttribute("hidden", "");
            this.containerHome.removeAttribute("hidden");
        })
    }

    ShowPageAfterForm = () => {
        sessionStorage.setItem("currentPage", "home");
        this.containerForm.setAttribute("hidden","");
        this.containerHome.removeAttribute("hidden");
        this.render.RenderPopularBookCard();
    }

    AddEventHandler = () => {
        this.render.RenderPopularBookCard();
    }
}