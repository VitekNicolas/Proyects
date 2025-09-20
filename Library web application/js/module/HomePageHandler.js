import { BasePageHandler } from "./BasePageHandler.js";

export class HomePageHandler extends BasePageHandler {

    constructor() {
        super();
        this.liHomePage = document.getElementById("liHomePage");
        this.localStorageHandler.CreateStorageForBooks("popular");
        this.localStorageHandler.FillPopular();
    }

    AddEventHandler = () => {
        this.liHomePage.addEventListener("click", () => {
            this.container.removeAttribute("hidden");
            this.divFilterContainer.setAttribute("hidden", "");  
            this.divPagination.setAttribute("hidden", "");
            this.divAdContainer.removeAttribute("hidden");
            this.divBookCartContainer.setAttribute("hidden", "");
            this.carousel.setAttribute("hidden", "");
            this.divFormContainer.setAttribute("hidden", "");
            this.ShowPage();
        });
    }

    ShowPage = () => {
        this.render.RenderPopularBookCard();
    }
}